import React, { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseconection";

interface SolicitationProps {
  corCamisa: string;
  tamanhoCamisa: string;
  sexo: string;
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
              className={`max-w-sm rounded-lg flex flex-col justify-center items-center p-3 gap-3 text-lg font-medium ${
                item.corCamisa === "cinzaChumbo"
                  ? "bg-gray-600"
                  : item.corCamisa === "azulRoyal"
                  ? "bg-blue-600"
                  : ""
              }`}
            >
              <h3> {item.id} </h3>
              <p
                className={` px-5 py-2  
                 
                `}
              >
                {item.tamanhoCamisa} - {item.sexo} - {item.quantidade} -
                {item.corCamisa}
              </p>
            </section>
          ))}
      </div>
    </>
  );
}
