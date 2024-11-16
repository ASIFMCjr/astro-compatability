// "use server";

// import { cookies } from "next/headers";
import { createEffect, createEvent, sample } from "effector";
import { pending } from "patronum/pending";
import { BrowserProvider } from "ethers";
import { authApi } from "shared/api";
import {
  ConnectFxType,
  GetCryptoAccountFxType,
  GetSignatureFxType,
  SignInFxType,
} from "./types";
import { setTokens } from "shared/model";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
declare var window: any;

// EVENTS
export const connectWalletEvent = createEvent();

// EFFECTS
const getCryptoAccountFx = createEffect<GetCryptoAccountFxType>(
  async (provider) => {
    return (await provider.send("eth_requestAccounts", []))[0] as string;
  }
);

const connectWalletFx = createEffect<ConnectFxType>(async (account) => {
  const {
    data: { nonce },
  } = await authApi.api.authSignInCreate({
    wallet_pub: account,
  });
  return { account, nonce };
});

const getSignatureFx = createEffect<GetSignatureFxType>(
  async ({ account, nonce }) => {
    const signature = (await window.ethereum.request({
      method: "personal_sign",
      params: [nonce, account],
    })) as string;
    return { account, signature };
  }
);

const signInFx = createEffect<SignInFxType>(async ({ account, signature }) => {
  const {
    data: { access_token, refresh_token },
  } = await authApi.api.authVerifySignatureCreate({
    signature,
    wallet_pub: account,
  });
  return { access_token, refresh_token };
});

export const $authPending = pending([
  getCryptoAccountFx,
  connectWalletFx,
  getSignatureFx,
  signInFx,
]);

sample({
  clock: connectWalletEvent,
  fn: () => new BrowserProvider(window.ethereum),
  target: getCryptoAccountFx,
});

sample({
  clock: getCryptoAccountFx.doneData,
  target: connectWalletFx,
});

sample({
  clock: connectWalletFx.doneData,
  target: getSignatureFx,
});

sample({
  clock: getSignatureFx.doneData,
  target: signInFx,
});

sample({
  clock: signInFx.doneData,
  fn: ({ access_token, refresh_token }) => {
    localStorage.setItem("access_token", access_token);
    setTokens(access_token, refresh_token);
    redirect("/profile/create");
  },
});
