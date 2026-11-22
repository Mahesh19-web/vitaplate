import React, { useState } from 'react'
import { ArrowUp, Leaf, Menu, Plus, Sparkles, X } from 'lucide-react'

const starters = [
  'Foods that may lower cancer risk',
  'Gentle meal ideas for nausea',
  'A simple anti-inflammatory lunch',
]

const replies = {
  'Foods that may lower cancer risk': 'A varied pattern rich in vegetables, fruit, whole grains, beans, nuts, and seeds is associated with lower cancer risk. No single food prevents cancer. Aim for plenty of colorful plants, limit processed meats, avoid tobacco, and follow guidance from your care team.',
  'Gentle meal ideas for nausea': 'Try small, cool meals such as banana porridge, plain crackers, yogurt with soft fruit, mashed potatoes, or broth with rice. Eat slowly, avoid strong smells, and sip fluids. If nausea is persistent or you cannot keep fluids down, contact your care team.',
  'A simple anti-inflammatory lunch': 'Try a warm bowl with quinoa, roasted or steamed vegetables, chickpeas, olive oil, and lemon. Add salmon or tofu if it is suitable for you. Keep portions flexible—comfort and adequate nutrition matter most.',
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  function ask(text) {
    const question = text.trim()
    if (!question) return
    const reply = replies[question] || 'That is a thoughtful question. Nutrition needs can change with treatment, medications, allergies, and symptoms. For a personalized answer, share what you are able to eat, your symptoms, and any instructions from your care team. Please do not delay urgent medical advice.'
    setMessages(prev => [...prev, { question, reply }])
    setInput('')
  }

  return (
    <main className="app">
      <header>
        <a className="brand" href="#" aria-label="VitaPlate home">
          <span className="brand-mark"><Leaf size={20} strokeWidth={2.2} /></span>
          <span>VitaPlate</span>
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#safety" onClick={() => setMenuOpen(false)}>Safety</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero">
        <div className="eyebrow"><Sparkles size={14} /> AI food guidance</div>
        <h1><span>Food support.</span><br />Made with care.</h1>
        <p className="intro">Gentle nutrition guidance for cancer prevention and early-stage support—clear, practical, and always judgment-free.</p>

        <div className="chat-panel">
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="assistant-icon"><Leaf size={19} /></div>
              <p>What would feel helpful today?</p>
            </div>
          ) : (
            <div className="conversation" aria-live="polite">
              {messages.map((message, index) => (
                <div className="exchange" key={index}>
                  <div className="user-message">{message.question}</div>
                  <div className="assistant-message">
                    <div className="mini-leaf"><Leaf size={13} /></div>
                    <p>{message.reply}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="composer">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && ask(input)}
              placeholder="Ask about food and cancer..."
              aria-label="Ask VitaPlate"
            />
            <button className="send" onClick={() => ask(input)} aria-label="Send question" disabled={!input.trim()}>
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {messages.length === 0 && (
          <div className="suggestions" id="about">
            {starters.map((item) => (
              <button key={item} onClick={() => ask(item)}>{item}<Plus size={15} /></button>
            ))}
          </div>
        )}
      </section>

      <footer id="safety">
        <p>VitaPlate offers general nutrition information, not medical diagnosis or treatment advice.</p>
        <a href="mailto:hello@vitaplate.example" id="contact">Questions? Contact us</a>
      </footer>
    </main>
  )
}
