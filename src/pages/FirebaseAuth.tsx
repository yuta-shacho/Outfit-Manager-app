import firebase from "firebase/compat/app"; // FirebaseUIのために互換バージョンを使用
import "firebaseui/dist/firebaseui.css";
import * as firebaseui from "firebaseui";
import { auth } from "../firebase";
import { useEffect } from "react";

const FirebaseAuth = () => {
  useEffect(() => {
    // FirebaseUIの設定
    const uiConfig = {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID, // Google認証を設定
          clientId:
            "649897087042-65pvmd68dnmvik1tnpdqrlub9nt6i3u8.apps.googleusercontent.com",
        },
      ],

      signInSuccessUrl: "/home", // ログイン後にリダイレクトされるURL
      signInFlow: "popup", // 認証方法をポップアップに設定
    };

    // FirebaseUIのインスタンスを取得し、ない場合は新規作成
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", uiConfig);

    return () => ui.reset(); // コンポーネントがアンマウントされるときにUIをリセット
  }, []);

  return <div id="firebaseui-auth-container"></div>;
};

export default FirebaseAuth;
