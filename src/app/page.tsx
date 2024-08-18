import Welcome from "./Components/Welcome"
import Step from "./Components/Step"


export default function Home() {
  return (
    <div>     
      <Welcome />
      <Step />
    </div> 
  );
}





// 這是註冊驗證的部分。
// import { getTokens } from "next-firebase-auth-edge";
// import { cookies } from "next/headers";
// import { notFound } from "next/navigation";
// import { clientConfig, serverConfig } from "../../config";
// import HomePage from "./HomePage";

// export default async function Home() {
//   const tokens = await getTokens(cookies(), {
//     apiKey: clientConfig.apiKey,
//     cookieName: serverConfig.cookieName,
//     cookieSignatureKeys: serverConfig.cookieSignatureKeys,
//     serviceAccount: serverConfig.serviceAccount,
//   });

//   if (!tokens) {
//     notFound();
//   }

//   return <HomePage email={tokens?.decodedToken.email} />;
// }







