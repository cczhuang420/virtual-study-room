import { useAuth } from "./providers/AuthProvider.jsx";
import PublicRouter from "./route-controllers/PublicRouter.jsx";
import PrivateRouter from "./route-controllers/PrivateRouter.jsx";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import WebFont from "webfontloader";
import { googleFonts } from "./fonts.js";
import CheckoutModal from "./components/CheckoutModal.jsx";

const ModalContext = createContext({});

const App = () => {
  const { getCurrentUser, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleOpen = useCallback(() => setOpen(true), []);

  const [content, setContent] = useState({
    hasProduct: false,
    title: "",
    imageTitle: "",
    image: null,
    cost: 0,
    money: 0,
    type: 0,
    onClick: () => {},
  });

  const value = useMemo(
    () => ({
      open,
      handleClose,
      handleOpen,
      content,
      setContent,
    }),
    [open, content]
  );

  useEffect(() => {
    WebFont.load({
      google: {
        families: googleFonts,
      },
    });
  }, []);

  if (loading) return null;

  if (!getCurrentUser()) {
    return <PublicRouter />;
  } else {
    return (
      <ModalContext.Provider value={value}>
        <CheckoutModal />
        <PrivateRouter />
      </ModalContext.Provider>
    );
  }
};

export default App;

export const useModal = () => useContext(ModalContext);
