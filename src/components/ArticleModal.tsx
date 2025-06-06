import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ArticleModal = ({ isOpen, onClose, children }: ArticleModalProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/resources');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 bg-white dark:bg-secondary-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="absolute right-4 top-4 z-10">
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-secondary-800 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-full transition-colors shadow-lg"
              >
                <span className="sr-only">Close</span>
                ✕
              </motion.button>
            </div>
            <div className="h-full overflow-auto">
              <div className="max-w-4xl mx-auto px-6 py-12 md:px-8 md:py-16">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal;