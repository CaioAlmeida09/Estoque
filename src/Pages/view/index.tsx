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
import { CiCalendarDate } from "react-icons/ci";
import { IoShirtOutline } from "react-icons/io5";
import { LiaSortAmountUpAltSolid } from "react-icons/lia";

interface SolicitationProps {
  tamanhos: string;
  quantidade: number;
  createdAt: string;
  idUser: string;
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
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");

  async function getPedidos() {
    const pedidosRef = collection(db, "camisas");
    const data = await getDocs(pedidosRef);

    const pedidoRef = data.docs.map((doc) => ({
      id: doc.id,
      idUser: doc.data().userId,
      ...doc.data(),
    })) as SolicitationProps[];

    console.log("Array de Solicitações:", pedidoRef);
    setSolicitacoes(pedidoRef);
    console.log(solicitacoes);
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
  function activeSearch() {
    if (search === false) {
      setSearch(true);
    }
    if (search === true) {
      setSearch(false);
    }
  }
  async function HandleSearch() {
    try {
      if (input === "") {
        getPedidos();
        return;
      }

      console.log(input);

      const q = query(collection(db, "camisas"), where("idUser", "==", input));

      const querySnapshot = await getDocs(q);

      const newList = [] as SolicitationProps[];

      console.log("Documentos recuperados:", querySnapshot.docs);

      try {
        querySnapshot.forEach((doc) => {
          newList.push({
            tamanhos: doc.data().tamanhos,
            quantidade: doc.data().quantidade,
            createdAt: doc.data().createdAt,
            idUser: doc.data().idUser,
            id: doc.id,
          });
        });
      } catch (error) {
        console.error("Erro ao processar documentos:", error);
      }

      setSolicitacoes(newList);
      console.log("Lista de novas solicitações:", newList);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
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
            <button onClick={activeSearch}>
              <FiSearch size={23} />
            </button>
          ) : null}
        </section>
        {search === true ? (
          <div className="flex gap-5">
            <input
              className="h-10 px-2 py-1 text-gray-900 w-60  "
              placeholder="Procure pelo ID do funcionário:"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
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
              className={` md:w-5/12 w-80 rounded-lg flex flex-col  p-3 gap-3 text-lg font-medium ${
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
                <h3 className="text-center  text-black bg-gray-300 rounded-lg px-2 py-1">
                  {" "}
                  {String(item.idUser)}
                </h3>
                <div className="grid md:grid-cols-4 grid-cols-2 justify-center ">
                  <section className="flex justify-center items-center gap-2  mt-3">
                    <IoShirtOutline size={25} />
                    <p>{item.tamanhos}</p>
                  </section>
                  <section className="flex justify-center items-center gap-2  mt-3">
                    <LiaSortAmountUpAltSolid size={25} />
                    <p>{item.quantidade}</p>
                  </section>
                  <section className="flex justify-center items-center gap-2  mt-3">
                    <CiCalendarDate size={25} />
                    <p>{item.createdAt}</p>
                  </section>
                  <button
                    onClick={() => HandleDelete(item)}
                    className="flex items-center justify-center mt-3"
                  >
                    <FaRegTrashAlt
                      size={27}
                      className=" bg-gray-400 hover:bg-red-600 p-1 rounded-md"
                    />
                  </button>
                </div>
              </div>
            </section>
          ))}
        {search === true ? (
          <button
            onClick={getPedidos}
            className="bg-blue-400 px-2 py-1 text-lg rounded-lg"
          >
            {" "}
            Ver todas as solicitações
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
