import React from "react";
import { Header } from "../../components/header";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseconection";

export interface TamanhoProps {
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
export function Estoque() {
  const [Tamanhos, setTamanhos] = useState<TamanhoProps[]>([]);
  useEffect(() => {
    async function getPedidos() {
      const pedidosRef = collection(db, "tamanhos");
      const data = await getDocs(pedidosRef);
      const pedidoRef = data.docs.map((doc) => ({
        ...doc.data(),
      })) as TamanhoProps[];

      setTamanhos(pedidoRef);
      console.log(pedidoRef);
    }

    getPedidos();
  }, []);
  return (
    <>
      <Header />{" "}
      <h1 className="text-lg font-medium text-center mt-3 md:text-2xl">
        {" "}
        Visualizando o Estoque
      </h1>
      {Tamanhos.map((item, index) => (
        <div
          className="h-screen w-full flex flex-col p-5 gap-5 items-center mt-4 text-lg"
          key={index}
        >
          <section className="flex flex-col md:flex-row gap-8">
            {" "}
            <section className=" bg-blue-900 w-80 flex flex-col justify-center items-center p-3 h-56 ">
              <h1 className=" text-2xl font-medium mb-2"> Azul Masculina</h1>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> P - Azul - Masculina:</p>
                  <p> {item["P-Azul-Masc"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> M - Azul - Masculina:</p>
                  <p> {item["M-Azul-Masc"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> G - Azul - Masculina:</p>
                  <p> {item["G-Azul-Masc"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> GG - Azul - Masculina:</p>
                  <p> {item["GG-Azul-Masc"]}</p>
                </div>
                <div className="flex gap-2">
                  {" "}
                  <p> XGG - Azul - Masculina:</p>
                  <p> {item["XGG-Azul-Masc"]}</p>
                </div>
              </div>
              {/* Sessão Cinza Masculina  */}
            </section>
            <section className=" bg-gray-700 w-80 flex flex-col justify-center items-center p-3 h-56 ">
              <h1 className="text-2xl font-medium mb-2"> Cinza Maculina</h1>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> P - Cinza - Masculina:</p>
                  <p> {item["P-Cinza-Masc"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> M - Cinza - Masculina:</p>
                  <p> {item["M-Cinza-Masc"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> G - Cinza - Masculina:</p>
                  <p> {item["G-Cinza-Masc"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> GG - Cinza - Masculina:</p>
                  <p> {item["GG-Cinza-Masc"]}</p>
                </div>
                <div className="flex gap-2">
                  {" "}
                  <p> XGG - Azul - Masculina:</p>
                  <p> {item["XGG-Cinza-Masc"]}</p>
                </div>
              </div>
            </section>{" "}
          </section>
          <section className="flex flex-col md:flex-row gap-8">
            {/* Sessão Azul Feminina */}
            <section className=" bg-blue-400 w-80 flex flex-col justify-center items-center p-3 h-56">
              <h1 className="text-2xl font-medium mb-2"> Azul Feminina</h1>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> P - Azul - Felimina:</p>
                  <p> {item["P-Azul-Fem"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> M - Azul - Feminina:</p>
                  <p> {item["M-Azul-Fem"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> G - Azul - Feminina:</p>
                  <p> {item["G-Azul-Fem"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> GG - Azul - Feminina:</p>
                  <p> {item["GG-Azul-Masc"]}</p>
                </div>
              </div>
            </section>
            {/* sessão cinza feminina */}
            <section className=" bg-gray-400 w-80 flex flex-col justify-center items-center p-3 h-56 ">
              <h1 className="text-2xl font-medium mb-2"> Cinza Feminina</h1>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> P - Cinza - Felimina:</p>
                  <p> {item["P-Cinza-Fem"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> M - Cinza- Feminina:</p>
                  <p> {item["M-Cinza-Fem"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> G - Cinza - Feminina:</p>
                  <p> {item["G-Cinza-Fem"]}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  {" "}
                  <p> GG - Cinza - Feminina:</p>
                  <p> {item["GG-Cinza-Masc"]}</p>
                </div>
              </div>
            </section>
          </section>
        </div>
      ))}
    </>
  );
}
