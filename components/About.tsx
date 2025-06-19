'use client';

import { motion } from 'framer-motion';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function About() {
  const hobbies = [
    {
      id: 'anime',
      title: 'Anime & Manga',
      description: 'A passionate otaku who finds inspiration in Japanese animation and storytelling. Anime has taught me about different perspectives, creativity, and the power of compelling narratives.',
      items: [
        'Monster - Complex characters and moral dilemmas',
        'Steins;Gate - Time travel and intricate plots',
        'Attack on Titan - Epic storytelling and complex characters',
        'Fullmetal Alchemist Brotherhood - Deep philosophical themes',
        'Death Note - Psychological thriller perfection',
        'Your Lie in April - Beautiful animation and emotional depth',
        'Demon Slayer - Stunning visuals and character development',
      ]
    },
    {
      id: 'books',
      title: 'Books & Reading',
      description: 'An avid reader who believes in the power of knowledge and storytelling. Books have shaped my thinking, expanded my horizons, and continue to inspire me to be a better developer and person.',
      items: [
        'Clean Code by Robert C. Martin - Code craftsmanship',
        'You don\'t Know JS by Kyle Simpson - Deep dive into JavaScript',
        'Sapiens by Yuval Noah Harari - Human history insights',
        'Ikigai by Hector Garcia and Francesc Miralles - Finding purpose',
        'And Then There Were None by Agatha Christie - Masterclass in mystery',
        'The Silent Patient by Alex Michaelides - Psychological thriller',
        'Mistborn by Brandon Sanderson - Epic fantasy world-building',
        'The Count of Monte Cristo by Alexandre Dumas - Revenge and redemption',
      ]
    },
    {
      id: 'trekking',
      title: 'Trekking & Adventure',
      description: 'Nature enthusiast who finds peace and challenge in the mountains. Trekking has taught me resilience, planning, and the importance of taking one step at a time - lessons that apply to life too.',
      items: [
        'Kalsubai Trek - Conquering the highest peak in Maharashtra',
        'Gorakhgad Trek - Exploring ancient forts and lush greenery',
        'Harishchandragad Trek - Majestic views and challenging trails',
      ]
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg">Beyond the code - my passions and interests</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.3 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ amount: 0.3 }}
              >
                <AccordionItem
                  value={hobby.id}
                  className="bg-card/50 border-border backdrop-blur-sm rounded-lg px-6 hover:bg-card/70 transition-all duration-300"
                >
                  <AccordionTrigger className="text-foreground hover:text-primary text-left">
                    <div className="flex items-center">
                      <span className="text-xl font-semibold">{hobby.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                    <p className="text-base leading-relaxed">{hobby.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {hobby.items.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="flex items-start bg-card/30 rounded-lg p-3 border border-border/50"
                        >
                          <span className="text-primary mr-3 text-sm">•</span>
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-card/50 border-border backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">My Philosophy</h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              {"Just like in anime where heroes grow stronger through challenges, in books where knowledge opens new worlds, and in mountains where every step brings you closer to the summit - coding is a journey of continuous learning, problem-solving, and reaching new heights."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}