import { db } from "../../services/firebaseconection";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Header } from "../../components/header";

function Home() {
  const [corCamisa, setCorCamisa] = useState({
    corCamisa: "bg-black",
  });

  const HandleSubmit = async () => {
    const corSelecionada = document.getElementById(
      "corCamisa"
    ) as HTMLSelectElement;
    const tamanhoSelecionado = document.getElementById(
      "tamanhoCamisa"
    ) as HTMLSelectElement;
    const sexoSelecionado = document.getElementById(
      "sexo"
    ) as HTMLSelectElement;
    const quantidadeSelecionada = document.getElementById(
      "quantidade"
    ) as HTMLSelectElement;
    const idDigitado = document.getElementById("id") as HTMLInputElement;

    const camisaData = {
      corCamisa: corSelecionada.value,
      tamanhoCamisa: tamanhoSelecionado.value,
      sexo: sexoSelecionado.value,
      quantidade: Number(quantidadeSelecionada.value),
      id: Number(idDigitado.value),
    };

    console.log("Dados a serem enviados:", camisaData);

    try {
      const docRef = await addDoc(collection(db, "camisas"), camisaData);
      console.log("Dados enviados com sucesso!");
      console.log("ID do documento adicionado:", docRef.id);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
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
          <section className="flex gap-5">
            <label htmlFor="corCamisa">Cor da Camisa:</label>
            <select
              id="corCamisa"
              name="corCamisa"
              onChange={handleCorCamisaChange}
              value={corCamisa.corCamisa}
            >
              <option value="cinzaChumbo">Cinza Chumbo</option>
              <option value="azulRoyal">Azul Royal</option>
            </select>
          </section>
          <section className="flex gap-5">
            <label htmlFor="tamanhoCamisa">Tamanho da camisa</label>
            <select id="tamanhoCamisa" name="tamanhoCamisa">
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
              <option value="XGG">XGG</option>
            </select>
          </section>
          <section className="flex gap-5">
            <label htmlFor="sexo">Sexo</label>
            <select id="sexo" name="sexo">
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </section>
          <section className="flex gap-5">
            <label htmlFor="quantidade">Quantidade:</label>
            <select id="quantidade" name="quantidade">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </section>
          <section className="flex gap-5">
            <label htmlFor="id">ID:</label>
            <input id="id" className="w-full h-6 p-1" />
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
