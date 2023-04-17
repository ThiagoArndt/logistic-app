import Header from "../common/components/Header";
import Sidebar from "../common/components/Sidebar";
import Head from "next/head";
import React from "react";

function PaginaPrincipal() {
  return (
    <div className="flex h-screen">
      <Head>
        <title>Almoxarifado</title>
      </Head>

      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />

        <div className="p-4 bg-[#F7F7F7] flex-1">
          aaaaaaaa
        </div>
      </div>
    </div>
  );
}

export default PaginaPrincipal;
