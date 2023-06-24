import { ModalProps } from "../components/modal/modal.types";

export function openModal({setProps}: ModalProps) {
    setProps((state) => ({ ...state, isOpen: true }))
  }

export function closeModal({setProps}: ModalProps) {
    setProps((prev) => ({ ...prev, isOpen: false }))
  }