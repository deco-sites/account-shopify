import Avatar from "deco-sites/account-shopify/components/ui/Avatar.tsx";
import { Address, CustomerInfo, UserOrders } from "$store/types.ts";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { useUI } from "$store/sdk/useUI.ts";
import Icon from "deco-sites/account-shopify/components/ui/Icon.tsx";
import { AvailableIcons } from "deco-sites/account-shopify/components/ui/Icon.tsx";

export interface Props {
  orders: UserOrders | null;
  userInfo: CustomerInfo | null;
  productImages: Record<string, string>;
  addresses: Address[];
  hideUserInfoButton?: boolean;
  hideOrdersButton?: boolean;
  hideAdressesButton?: boolean;
  hideLogoutButton?: boolean;
}

function Button({
  label,
  onClick,
  isSelected = false,
  icon
}: {
  label: string;
  onClick: (value: string) => void;
  isSelected?: boolean;
  icon: AvailableIcons
}) {
  return (
    <button
      onClick={() => onClick(label)}
      class={`px-10 py-5 text-left border-t-[1px]  hover:bg-gray-200 hover:border-l-2 hover:border-l-gray-500 flex gap-2 ${
        isSelected ? "bg-gray-100 border-l-2 border-l-gray-500" : "border-l-2 border-l-white"
      }`}
    >
      <Icon id={icon} size={24} strokeWidth={0.4} />
      <div>{label}</div>
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

function MyAccount(
  {
    orders,
    userInfo,
    productImages,
    addresses,
    hideUserInfoButton,
    hideOrdersButton,
    hideAdressesButton,
    hideLogoutButton,
  }: Props,
) {  
  const { selectedMyAccountTab } = useUI();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  useEffect(() => {
    // :( sad
    const hash = location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const option = params.get("option");
    if (option && ["Dados", "Pedidos", "Endereços"].includes(option)) {
      selectedMyAccountTab.value = option;
    }
  }, []);

  const selectedAddress = addresses.length > 0
    ? addresses[selectedAddressIndex]
    : undefined;

  const initials = useMemo(
    () =>
      userInfo && userInfo.firstName && userInfo.lastName
        ? userInfo.firstName.charAt(0) + userInfo.lastName.charAt(0)
        : "",
    [userInfo],
  );

  const setSelectedOption = useCallback((value: string) => {
    selectedMyAccountTab.value = value;
    location.hash = `option=${value}`;
  }, []);

  return (
    <div class="px-44 py-10 bg-gray-100">
      <div class="flex gap-10">
        <div class="flex flex-col justify-between shadow-md bg-white rounded-md max-h-[420px]">
          <div class="p-10 text-xl flex gap-5 flex-col h-full items-center justify-center">
            <Avatar content={initials} />
            <div class="flex flex-row">
              <div class="mr-1">Olá</div>
              <b>{userInfo?.firstName}</b>
            </div>
          </div>
          <div class="flex flex-col">
            {!hideUserInfoButton && <Button
              onClick={setSelectedOption}
              label="Dados"              icon="User"

              isSelected={selectedMyAccountTab.value === "Dados"}
            />}
            
            {!hideOrdersButton && <Button
              onClick={setSelectedOption}
              label="Pedidos"
              icon="ShoppingCart"

              isSelected={selectedMyAccountTab.value === "Pedidos"}
            />}
            
            {!hideAdressesButton && <Button
              onClick={setSelectedOption}
              label="Endereços"
              icon="Truck"

              isSelected={selectedMyAccountTab.value === "Endereços"}
            />}
            {!hideLogoutButton && <Button icon="XMark" onClick={() => {}} label="Sair" />}
          </div>
        </div>
        {selectedMyAccountTab.value === "Dados" && (
          <div class="rounded-md w-3/5">
            <div class="text-3xl text-gray-700 font-bold mb-6">
              Dados Pessoais
            </div>
            <div class="shadow-md bg-white w-full">
              <div class="grid grid-cols-2 p-10 w-full">
                <Field label="Nome" value={userInfo?.firstName || ""} />
                <Field label="Sobrenome" value={userInfo?.lastName || ""} />
              </div>
              <div class="grid grid-cols-2 p-10 w-full">
                <Field label="E-mail" value={userInfo?.email || ""} />
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
        {selectedMyAccountTab.value === "Pedidos" && (
          <div class="w-3/5">
            <div class="text-3xl text-gray-700 font-bold mb-6">Pedidos</div>
            <div class="rounded-md  shadow-md bg-white w-full">
              <table class="w-full">
                <tr class="w-full h-14 border-b">
                  <th>ID</th>
                  <th>Preço Total</th>
                  <th>Data da compra</th>
                  <th>Status de Pagamento</th>
                  <th>Imagem</th>
                </tr>
                {orders?.map((order) => {
                  return (
                    <tr class="w-full text-center h-20">
                      <td>{order.name}</td>
                      <td>{order.totalPrice}</td>
                      <td>{new Date(order.createdAt).toDateString()}</td>
                      <td>{order.status}</td>
                      <td>
                        <img
                          src={productImages[order.products[0]]}
                          alt="product_img"
                          class="w-16 m-auto"
                        />
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        )}
        {selectedMyAccountTab.value === "Endereços" && (
          <div class="rounded-md w-3/5">
            <div class="text-3xl text-gray-700 font-bold mb-6">
              Dados do Endereço Selecionado:
            </div>
            <div class="w-full flex flex-row justify-start mb-6">
              <div class="flex flex-col justify-center items-center">
                <select
                  onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    setSelectedAddressIndex(Number(target.value));
                  }}
                  class="select select-bordered select-sm h-10"
                >
                  {addresses?.map((address, i) => (
                    <option value={i}>{address?.id}</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="shadow-md bg-white w-full">
              <div class="grid grid-cols-2 p-10 w-full">
                <Field
                  label="Nome"
                  value={selectedAddress?.first_name || "--"}
                />
                <Field
                  label="Sobrenome"
                  value={selectedAddress?.last_name || "--"}
                />
              </div>
              <div class="grid grid-cols-2 p-10 w-full">
                <Field
                  label="Endereço Linha 1"
                  value={selectedAddress?.address1 || "--"}
                />
              </div>
              <div class="grid grid-cols-2 p-10 w-full">
                <Field
                  label="Endereço Linha 2"
                  value={selectedAddress?.address2 || "--"}
                />
              </div>
              <div class="grid grid-cols-2 p-10 w-full">
                <Field label="Cidade" value={selectedAddress?.city || "--"} />
                <Field
                  label="Estado"
                  value={selectedAddress?.province || "--"}
                />
              </div>
              <div class="grid grid-cols-2 p-10 w-full">
                <Field label="CEP" value={selectedAddress?.zip || "--"} />
                <Field
                  label="Telefone"
                  value={selectedAddress?.phone || "--"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAccount;
