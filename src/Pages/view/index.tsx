import React, { useState, useEffect } from "react";
import { Header } from "../../components/header";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebaseconection";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

interface SolicitationProps {
  tamanhos: string;
  quantidade: number;
  createdAt: string;
  userId: string;
  id: string;
}
interface TamanhoProps {
  "P-Cinza-Masc": number;
  "P-Cinza-Fem": number;
  "P-Azul-Masc": number;
  "P-Azul-Fem": number;
  "M-Cinza-Masc": number;
  "M-Cinza-Fem": number;
  "M-Azul-Masc": number;
  "M-Azul-Fem": number;
  "GG-Cinza-Masc": number;
  "GG-Cinza-Fem": number;
  "GG-Azul-Masc": number;
  "GG-Azul-Fem": number;
  "G-Cinza-Masc": number;
  "G-Cinza-Fem": number;
  "G-Azul-Masc": number;
  "G-Azul-Fem": number;
  "XGG-Azul-Masc": number;
  "XGG-Cinza-Masc": number;
}

export function View() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitationProps[]>([]);
  const [tamanhos, setTamanhos] = useState<TamanhoProps[]>([]);
  const [search, setSearch] = useState(true);
  const [searchId, setSearchId] = useState("");

  async function getPedidos() {
    const pedidosRef = collection(db, "camisas");
    const data = await getDocs(pedidosRef);

    const pedidoRef = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SolicitationProps[];

    console.log("Array de Solicitações:", pedidoRef);
    setSolicitacoes(pedidoRef);
  }

  useEffect(() => {
    getPedidos();
  }, []);
  useEffect(() => {
    async function getTamanhos() {
      const tamanhosRef = collection(db, "tamanhos");
      const dataTamanho = await getDocs(tamanhosRef);
      const tamanhoRef = dataTamanho.docs.map((doc) => ({
        ...doc.data(),
      })) as TamanhoProps[];

      setTamanhos(tamanhoRef);
    }

    getTamanhos();
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

    const docID = "PZiKQTer4Eib9atJKvFv";

    const newSize = item.quantidade;
    const tamanhoModel = item.tamanhos;
    console.log(newSize);
    console.log(tamanhoModel);

    const newTamanhos = tamanhos.map((tamanho) => {
      if (tamanhoModel in tamanho) {
        return {
          ...tamanho,
          [tamanhoModel]: tamanho[tamanhoModel] - newSize,
        };
      }
      return tamanho;
    });

    setTamanhos(newTamanhos);
    const tamanhosRef = doc(db, "tamanhos", docID);
    const docSnapshot = await getDoc(tamanhosRef);
    const newTamanhosObject = Object.assign({}, ...newTamanhos);
    if (docSnapshot.exists()) {
      // O documento existe, pode prosseguir com a atualização
      await updateDoc(tamanhosRef, newTamanhosObject);
      console.log("Documento de tamanhos atualizado com sucesso!");
    } else {
      console.error("Documento de tamanhos não encontrado!");
    }
    await updateDoc(tamanhosRef, newTamanhosObject);
  }

  async function HandleSearch() {
    if (searchId === "") {
      getPedidos();
      return;
    }
    const q = query(
      collection(db, "camisas"),
      where("userId", ">=", searchId),
      where("userId", "<=", searchId + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    const newList = [] as SolicitationProps[];

    querySnapshot.forEach((doc) => {
      newList.push({
        tamanhos: doc.data().tamanhos,
        quantidade: doc.data().quantidade,
        createdAt: doc.data().createdAt,
        userId: doc.data().userId,
        id: doc.id,
      });
    });
    setSolicitacoes(newList);
  }

  return (
    <>
      <Header />
      <div className="flex flex-col  items-center gap-8">
        <section className="flex flex-row justify-between items-center h-10 gap-5">
          <h1 className="text-2xl text-black font-bold">
            Últimas Solicitações
          </h1>
          {search === false ? (
            <button onClick={HandleSearch}>
              <FiSearch size={23} />
            </button>
          ) : null}
        </section>
        {search === true ? (
          <div className="flex gap-5">
            <input
              className="h-10 px-2 py-1 text-gray-700 w-60 bg-orange-400 "
              placeholder="Procure pelo ID do funcionário:"
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={HandleSearch}>
              <FiSearch size={23} />
            </button>
          </div>
        ) : null}

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
              <div className="flex flex-col justify-between items-center text-base">
                <h3 className="text-center bg-orange-400 text-black">
                  {item.id}
                </h3>
                <div className="flex">
                  <section className="flex flex-col justify-center items-center">
                    <p> Modelo: </p>
                    <p> {item.tamanhos} </p>
                  </section>
                  <section className="flex flex-col justify-center items-center">
                    <p> Quantidade: </p>
                    <p> {item.quantidade}</p>
                  </section>
                  <section className="flex flex-col justify-center items-center">
                    <p> Data: </p>
                    <p> {item.createdAt}</p>
                  </section>
                  <button onClick={() => HandleDelete(item)}>
                    <FaRegTrashAlt size={25} />
                  </button>
                </div>
              </div>
            </section>
          ))}
      </div>
    </>
  );
}
