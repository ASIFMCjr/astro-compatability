import { BrowserProvider } from "ethers";
export interface SignIn {
  account: string;
  nonce: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export type ConnectFxType = (account: string) => Promise<SignIn>;
export type GetCryptoAccountFxType = (
  provider: BrowserProvider
) => Promise<string>;
export type GetSignatureFxType = (signData: SignIn) => Promise<{
  account: string;
  signature: string;
}>;

export type SignInFxType = ({
  account,
  signature,
}: {
  account: string;
  signature: string;
}) => Promise<Tokens>;
