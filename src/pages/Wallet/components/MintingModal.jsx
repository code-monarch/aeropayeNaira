import React from 'react'
import {
  toastLoading,
} from "../../component/shared/Toasts";
import { Modal } from "react-responsive-modal";

const MintingModal = ({showMintingModal, clodeMintingModal}) => {
    return (
      <Modal
        open={showMintingModal}
        onClose={showMintingModal}
        focusTrapped
        top
        closeIconId="closeButton"
      >
            <div>{toastLoading("Minting Aeropaye tokens to your wallet")}</div>
      </Modal>
    );
}

export default MintingModal