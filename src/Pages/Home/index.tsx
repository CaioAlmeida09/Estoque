import { format } from "date-fns";
import Swal from "sweetalert2";
import { db } from "../../services/firebaseconection";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
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

export function Home() {
  const [corCamisa, setCorCamisa] = useState({});
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
    const dataAtual = new Date();
    const dataSolicitacao = format(dataAtual, "dd/MM/yyyy");

    if (idDigitado.value === "") {
      Swal.fire({
        title: "O campo ID é obrigatório!",
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }

    const camisaData = {
      tamanhos: tamanhoSelecionado.value,
      quantidade: Number(quantidadeSelecionada.value),
      idUser: idDigitado.value,
      createdAt: dataSolicitacao,
    };

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
      [camisaData.tamanhos]: increment(camisaData.quantidade),
    })
      .then(() => {
        console.log("Documento atualizado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao atualizar documento: ", error);
      });
    Swal.fire({
      title: "Dado enviado com sucesso!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleTamanhoChange = (event) => {
    const tamanhoSelecionado = event.target.value;

    if (
      tamanhoSelecionado === "P-Azul-Fem" ||
      tamanhoSelecionado === "P-Azul-Masc" ||
      tamanhoSelecionado === "M-Azul-Masc" ||
      tamanhoSelecionado === "M-Azul-Fem" ||
      tamanhoSelecionado === "G-Azul-Fem" ||
      tamanhoSelecionado === "G-Azul-Masc" ||
      tamanhoSelecionado === "GG-Azul-Masc" ||
      tamanhoSelecionado === "GG-Azul-Fem" ||
      tamanhoSelecionado === "XGG-Azul-Masc"
    ) {
      setCorCamisa("Azul");
      console.log("Cor da camisa após setCorCamisa:", corCamisa);
    } else {
      setCorCamisa("Cinza");
    }
  };

  return (
    <>
      <Header />

      <div className="h-screen w-full flex flex-col justify-start items-center p-5">
        <h1 className=" text-lg md:text-3xl text-center mt-5 mb-2 font-medium">
          {" "}
          Controle do Estoque de Camisas{" "}
        </h1>
        <form
          id="meuFormulario"
          className={`flex flex-col gap-8 max-w-sm bg-blue-400 p-8 mt-8 text-lg font-medium rounded-lg ${
            corCamisa === "Azul"
              ? "bg-blue-800"
              : corCamisa === "Cinza"
              ? "bg-gray-700"
              : ""
          }`}
        >
          <section className="flex flex-col gap-5">
            <label> Selecione o Tamanho e Cor da Camisa</label>
            <select id="tamanhos" onChange={handleTamanhoChange}>
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
            <label htmlFor="quantidade">Quantidade :</label>
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
