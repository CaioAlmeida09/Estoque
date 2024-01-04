import React, { useState, useEffect } from "react";
import { Header } from "../../components/header";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseconection";
import { FaRegTrashAlt } from "react-icons/fa";

interface SolicitationProps {
  tamanhos: string;
  quantidade: number;
  createdAt: string;
  userId: string;
  id: string;
}

export function View() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitationProps[]>([]);

  useEffect(() => {
    async function getPedidos() {
      const pedidosRef = collection(db, "camisas");
      const data = await getDocs(pedidosRef);

      const pedidoRef = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SolicitationProps[];

      setSolicitacoes(pedidoRef);
      console.log(pedidoRef);
    }

    getPedidos();
  }, []);

  async function HandleDelete(item: SolicitationProps) {
    console.log("Item a ser excluído:", item.id);

    try {
      const pedidoRef = doc(db, "camisas", item.id);
      await deleteDoc(pedidoRef);

      console.log("Documento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir documento:", error);
    }

    const newList = solicitacoes.filter((obj) => obj.id !== item.id);
    setSolicitacoes(newList);

    const docID = item.id;
    const tamanhosRef = doc(db, "tamanhos", docID);

    const docSnapshot = await getDoc(tamanhosRef);

    const newSize = docSnapshot[item.tamanhos] - item.quantidade;

    try {
      await updateDoc(tamanhosRef, {
        [item.tamanhos]: newSize,
      });
      console.log("Documento em 'tamanhos' atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar documento em 'tamanhos': ", error);
    }
  }
  return (
    <>
      <Header />
      <div className="flex flex-col  items-center gap-8">
        <h1 className="mt-8 text-2xl text-black font-bold">
          Últimas Solicitações
        </h1>
        {solicitacoes &&
          solicitacoes.map((item, index) => (
            <section
              key={index}
              className={` w-80 rounded-lg flex flex-col  p-3 gap-3 text-lg font-medium ${
                item.tamanhos === "P-Azul-Fem" ||
                item.tamanhos === "P-Azul-Masc" ||
                item.tamanhos === "M-Azul-Masc" ||
                item.tamanhos === "M-Azul-Fem" ||
                item.tamanhos === "G-Azul-Fem" ||
                item.tamanhos === "G-Azul-Masc" ||
                item.tamanhos === "GG-Azul-Masc" ||
                item.tamanhos === "GG-Azul-Fem" ||
                item.tamanhos === "XGG-Azul-Masc"
                  ? "bg-blue-600"
                  : "bg-gray-600"
              }`}
            >
              <h3 className="text-center"> {item.userId} </h3>
              <div className="flex justify-between items-center text-base">
                <section className="flex flex-col justify-center items-center">
                  <p> Modelo </p>
                  <p> {item.tamanhos} </p>
                </section>
                <section className="flex flex-col justify-center items-center">
                  <p> Quantidade </p>
                  <p> {item.quantidade}</p>
                </section>
                <section className="flex flex-col justify-center items-center">
                  <p> Data </p>
                  <p> {item.createdAt}</p>
                </section>
                <button onClick={() => HandleDelete(item)}>
                  <FaRegTrashAlt size={25} />
                </button>
              </div>
            </section>
          ))}
      </div>
    </>
  );
}
