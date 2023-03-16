import CredentialsLogin from "@/components/auth/CredentialsLogin";
import {CtxOrReq} from "next-auth/client/_utils";
import {getCsrfToken, signIn} from "next-auth/react";
import {Button} from "antd";

function LoginPage({csrfToken}: { csrfToken: string }) {
    return (
        <>
            <div>
                <CredentialsLogin/>
                <Button onClick={() => signIn("credentials", {}, {

                },)}>test</Button>
            </div>
        </>
    );
}

export default LoginPage;

export async function getServerSideProps(context: CtxOrReq | undefined) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
