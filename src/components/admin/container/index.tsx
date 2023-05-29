import {ComponentProps} from "react";

interface AdminContainerProps extends ComponentProps<"div"> {

}

function AdminContainer(props: AdminContainerProps) {
  return (
    <>
      <main style={{height: "100vh", minHeight: "100vh", width: "100vw", display: "flex"}}>
        <div {...props} style={{height: "100%", width: "100%", overflow: "scroll", display: "flex", position:"relative"}}>
          {props.children}
        </div>
      </main>
    </>
  )
}

export default AdminContainer