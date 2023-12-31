import { db } from "./services/firebaseconection";
import { collection, addDoc } from "firebase/firestore";

function App() {
  async function HandleSubmit() {
    const corSelecionada = document.getElementById("corCamisa").value;
    const tamanhoSelecionado = document.getElementById("tamanhoCamisa").value;
    const sexoSelecionado = document.getElementById("sexo").value;
    const quantidadeSelecionada = document.getElementById("quantidade").value;
    const idDigitado = document.getElementById("id").value;

    // Crie um objeto com os dados da camisa
    const camisaData = {
      corCamisa: corSelecionada,
      tamanhoCamisa: tamanhoSelecionado,
      sexo: sexoSelecionado,
      quantidade: parseInt(quantidadeSelecionada, 10), // Converta para número
      id: parseInt(idDigitado, 10), // Converta para número
    };

    console.log("Dados a serem enviados:", camisaData);

    try {
      // Adicione os dados à coleção "camisas" no Firestore
      const docRef = await addDoc(collection(db, "camisas"), camisaData);

      console.log("Dados enviados com sucesso!");
      console.log("ID do documento adicionado:", docRef.id);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  }

  return (
    <>
      <header>
        <h1 className=" h-20 text-2xl bg-blue-300 flex justify-center items-center">
          {" "}
          Controle de Estoque de Camisas - Filial Recife
        </h1>
      </header>
      <div className="h-screen w-full flex flex-col justify-start items-center">
        <form
          id="meuFormulario"
          className="flex flex-col gap-8 max-w-sm bg-blue-400 p-8 mt-8 text-lg font-medium"
        >
          <section className="flex gap-5">
            <label htmlFor="corCamisa">Cor da Camisa:</label>
            <select id="corCamisa" name="corCamisa">
              <option value="vermelha">Vermelha</option>
              <option value="amarela">Amarela</option>
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
              <option value="masculino"> Masculino</option>
              <option value="feminino"> Feminino </option>
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
            {" "}
            Enviar{" "}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
