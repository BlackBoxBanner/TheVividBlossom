import {ComponentProps} from "react";

interface AdminContainerProps extends ComponentProps<"div"> {

}

export function AdminContainer(props: AdminContainerProps) {
  return (
    <>
      <main style={{height: "100vh", minHeight: "100vh", width: "100vw", display: "flex"}}>
        <div {...props}
             style={{height: "100%", width: "100%", overflow: "scroll", display: "flex", position: "relative"}}>
          {props.children}
        </div>
      </main>
    </>
  )
}

interface ContentContainerProps extends ComponentProps<"div"> {

}

export function ContentContainer(props: ContentContainerProps) {
  return (
    <>
      <div style={{
        minHeight: "100%",
        height: "fit-content",
        width: "100%",
        display: "block",
        padding: "1rem"
      }}>
        {props.children}
      </div>
    </>
  )
}
