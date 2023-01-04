import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { connectorsByName } from '../utils/web3React'
import { setupNetwork } from '../utils/wallet'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  
  const login = useCallback((connectorID) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
      // alert("all goog")
      activate(connector, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector)
          }
        } else {
          connector.walletConnectProvider = undefined
          // toastError(error.name, error.message)
        }
      })
    } else {
      // toastError("Can't find connector", 'The connector config is wrong')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, logout: deactivate }
}

export default useAuth;
