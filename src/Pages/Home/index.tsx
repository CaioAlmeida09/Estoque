import { db } from "../../services/firebaseconection";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Header } from "../../components/header";

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

function Home() {
  const [corCamisa, setCorCamisa] = useState({
    corCamisa: "bg-black",
  });
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

  const HandleSubmit = async () => {
    const tamanhoSelecionado = document.getElementById(
      "tamanhos"
    ) as HTMLSelectElement;

    const quantidadeSelecionada = document.getElementById(
      "quantidade"
    ) as HTMLSelectElement;
    const idDigitado = document.getElementById("id") as HTMLInputElement;

    const camisaData = {
      tamanhos: tamanhoSelecionado.value,
      quantidade: Number(quantidadeSelecionada.value),
      id: Number(idDigitado.value),
    };

    if (
      camisaData.tamanhos === "P-Azul-Fem" ||
      camisaData.tamanhos === "P-Azul-Masc" ||
      camisaData.tamanhos === "M-Azul-Masc" ||
      camisaData.tamanhos === "M-Azul-Fem" ||
      camisaData.tamanhos === "G-Azul-Fem" ||
      camisaData.tamanhos === "G-Azul-Masc" ||
      camisaData.tamanhos === "GG-Azul-Masc" ||
      camisaData.tamanhos === "GG-Azul-Fem" ||
      camisaData.tamanhos === "XGG-Azul-Masc"
    ) {
      console.log("Tamanho selecionado:", tamanhoSelecionado.value);
      console.log("Cor da camisa após setCorCamisa:", corCamisa);
    }
    console.log("Dados a serem enviados:", camisaData);

    try {
      const docRef = await addDoc(collection(db, "camisas"), camisaData);
      console.log("Dados enviados com sucesso!");
      console.log("ID do documento adicionado:", docRef.id);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }

    const documentId = "PZiKQTer4Eib9atJKvFv";
    const documentoRef = doc(db, "tamanhos", documentId);
    updateDoc(documentoRef, {
      "G-Azul-Fem": 1,
    })
      .then(() => {
        console.log("Documento atualizado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao atualizar documento: ", error);
      });
  };

  const handleCorCamisaChange = (event) => {
    setCorCamisa({ corCamisa: event.target.value });
  };

  return (
    <>
      <Header />
      <div className="h-screen w-full flex flex-col justify-start items-center">
        <form
          id="meuFormulario"
          className={`flex flex-col gap-8 max-w-sm bg-blue-400 p-8 mt-8 text-lg font-medium ${
            corCamisa.corCamisa === "azulRoyal"
              ? "bg-blue-600"
              : corCamisa.corCamisa === "cinzaChumbo"
              ? "bg-gray-600"
              : ""
          }`}
        >
          <section className="flex flex-col gap-5">
            <label> Selecione o Tamanho e Cor da Camisa</label>
            <select id="tamanhos">
              <option value="P-Cinza-Masc">P - Cinza - Masculina</option>
              <option value="P-Cinza-Fem">P - Cinza - Feminina</option>
              <option value="P-Azul-Masc">P - Azul - Masculina</option>
              <option value="P-Azul-Fem">P - Azul - Feminina</option>
              <option value="M-Cinza-Fem">M - Cinza - Feminina</option>
              <option value="M-Cinza-Masc">M - Cinza - Masculino</option>
              <option value="M-Azul-Fem">M - Azul - Feminina</option>
              <option value="M-Azul-Masc">M - Azul - Masculina</option>
              <option value="G-Cinza-Fem">G - Cinza - Feminina</option>
              <option value="G-Cinza-Masc">G - Cinza - Masculina</option>
              <option value="G-Azul-Fem">G - Azul - Feminina</option>
              <option value="G-Azul-Masc">G - Azul - Masculino</option>
              <option value="GG-Cinza-Fem">GG - Cinza - Feminina</option>
              <option value="GG-Cinza-Masc">GG - Cinza - Masculino</option>
              <option value="GG-Azul-Fem">GG - Azul - Feminina</option>
              <option value="GG-Azul-Masc">GG - Azul - Masculino</option>
              <option value="XGG-Azul-Masc">XGG - Cinza - Masculino</option>
              <option value="XGG-Cinza-Masc">XGG - Azul - Masculino</option>
            </select>
          </section>

          <section className="flex gap-5">
            <label htmlFor="quantidade">Quantidade:</label>
            <select id="quantidade" name="quantidade" className="h-8">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </section>
          <section className="flex gap-5">
            <label htmlFor="id">ID:</label>
            <input id="id" className="w-full h-8 p-1" />
          </section>
          <button
            type="button"
            onClick={HandleSubmit}
            className="px-4 py-1 rounded-lg text-black bg-green-400 hover:bg-black hover:text-green-400"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}

export default Home;
