import Avatar from "deco-sites/account-shopify/components/ui/Avatar.tsx";
import { useState } from "preact/hooks";

export interface Props {
  title: string;
}

function Button(
  { label, onClick }: { label: string; onClick: (value: string) => void },
) {
  return (
    <button
      onClick={() => onClick(label)}
      class="px-10 py-5 text-left border-t-[1px] hover:bg-gray-200 hover:border-l-2 hover:border-l-gray-500 "
    >
      {label}
    </button>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div class="">
      <div class="font-bold">{label}</div>
      <div>{value}</div>
    </div>
  );
}

function MyAccount({}: Props) {
  return (
    <div class="px-44 py-10 bg-gray-100">
      <div class="flex gap-10">
        <div class="flex flex-col justify-between shadow-md bg-white rounded-md">
          <div class="p-10 text-xl flex gap-5 flex-col h-full items-center justify-center">
            <Avatar content="FM" />
            <div class="flex flex-row">
              <div class="mr-1">Olá</div>
              <b>Felipe Mota</b>
            </div>
          </div>
          <div class="flex flex-col">
            <Button onClick={() => {}} label="Dados" />
            <Button onClick={() => {}} label="Pedidos" />
            <Button onClick={() => {}} label="Endereços" />
            <Button onClick={() => {}} label="Cartões" />
            <Button onClick={() => {}} label="Sair" />
          </div>
        </div>

        {true
          ? (
            <div class="rounded-md w-3/5">
              <div class="text-3xl text-gray-700 font-bold mb-6">
                Dados Pessoais
              </div>
              <div class="shadow-md bg-white w-full">
                <div class="grid grid-cols-2 p-10 w-full">
                  <Field label="Nome" value="Felipe" />
                  <Field label="Sobrenome" value="Mota" />
                </div>
                <div class="grid grid-cols-2 p-10 w-full">
                  <Field label="E-mail" value="felipemota@gmail.com" />
                </div>
                <div class="grid grid-cols-2 p-10 w-full">
                  <Field label="CPF" value="112.321.654-32" />
                  <Field label="Gênero" value="Masculino" />
                </div>
                <div class="grid grid-cols-2 p-10 w-full">
                  <Field label="Data de nascimento" value="25/12/1923" />
                  <Field label="Telefone" value="(83) 9 9664-4966" />
                </div>
              </div>
            </div>
          )
          : (
            <div class="rounded-md w-3/5">
              <div class="text-3xl text-gray-700 font-bold mb-6">Pedidos</div>
              <div class="shadow-md bg-white w-full">
                <div class="grid grid-cols-2 p-10 w-full">
                  <Field label="Nome" value="Felipe" />
                  <Field label="Sobrenome" value="Mota" />
                </div>
                <div class="grid grid-cols-2 p-10 w-full">
                  <Field label="E-mail" value="felipemota@gmail.com" />
                </div>
                <div class="grid grid-cols-2 p-10 w-full">
                  <Field label="CPF" value="112.321.654-32" />
                  <Field label="Gênero" value="Masculino" />
                </div>
                <div class="grid grid-cols-2 p-10 w-full">
                  <Field label="Data de nascimento" value="25/12/1923" />
                  <Field label="Telefone" value="(83) 9 9664-4966" />
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default MyAccount;
