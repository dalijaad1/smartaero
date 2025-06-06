import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from './resourcesData';
import ArticleModal from '../components/ArticleModal';

const ResourceArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            The article you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ArticleModal isOpen={true} onClose={() => navigate('/resources')}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {article.image && (
          <div className="relative h-[300px] md:h-[400px] -mx-6 md:-mx-8 -mt-12 md:-mt-16 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10" />
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {article.title}
              </h1>
              <p className="text-xl text-white/90">
                {article.description}
              </p>
            </div>
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="space-y-8">
            {!article.image && (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {article.title}
                </h1>
                <p className="text-xl text-secondary-600 dark:text-secondary-400">
                  {article.description}
                </p>
              </>
            )}

            <div className="prose-headings:text-secondary-900 dark:prose-headings:text-white prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-strong:text-secondary-900 dark:prose-strong:text-white prose-ul:space-y-2 prose-li:text-secondary-600 dark:prose-li:text-secondary-400 prose-p:text-secondary-600 dark:prose-p:text-secondary-400">
              {article.content}
            </div>
          </div>
        </div>
      </motion.div>
    </ArticleModal>
  );
};

export default ResourceArticle;