
export type Props = {
  title: string
  isOpen: boolean
  children: JSX.Element
}


export type ModalProps = {
    setProps: React.Dispatch<
      React.SetStateAction<{
        title: string
        isOpen: boolean
      }>
    >
  }