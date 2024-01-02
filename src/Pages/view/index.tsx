import React, { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseconection";

interface SolicitationProps {
  tamanhos: string;
  quantidade: number;
  id: string;
}

export function View() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitationProps[]>([]);

  useEffect(() => {
    async function getPedidos() {
      const pedidosRef = collection(db, "camisas");
      const data = await getDocs(pedidosRef);

      const pedidoRef = data.docs.map((doc) => ({
        ...doc.data(),
      })) as SolicitationProps[];

      setSolicitacoes(pedidoRef);
      console.log(pedidoRef);
      console.log("teste");
    }

    getPedidos();
  }, []);

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
              <h3 className="text-center"> {item.id} </h3>
              <div className="flex justify-between items-center text-base">
                <section className="flex flex-col justify-center items-center">
                  <p> Modelo </p>
                  <p> {item.tamanhos} </p>
                </section>
                <section className="flex flex-col justify-center items-center">
                  <p> Quantidade </p>
                  <p> {item.quantidade}</p>
                </section>
              </div>
            </section>
          ))}
      </div>
    </>
  );
}
