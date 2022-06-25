import AuthCheck from "/components/AuthCheck";

export default function Admin(){
          return(
                    <main>
		<AuthCheck>
                              user is there
                    </AuthCheck>
		</main>
          );
}