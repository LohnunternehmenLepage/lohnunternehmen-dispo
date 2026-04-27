import React, { useState } from 'react'

export default function App() {
  const [view, setView] = useState('dashboard')

  const [jobs, setJobs] = useState([
    { id: 1, kunde: 'Müller Agrar', typ: 'Gülle', status: 'neu', zeit: 'morgen', ort: 'Prüm' }
  ])

  const [form, setForm] = useState({
    kunde: '',
    typ: '',
    ort: '',
    zeit: ''
  })

  const addJob = () => {
    setJobs([{ id: Date.now(), ...form, status: 'neu' }, ...jobs])
    setView('dashboard')
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      {view === 'dashboard' ? (
        <div>
          <h1>Dispo Dashboard</h1>
          <button onClick={() => setView('form')}>+ Neuer Auftrag</button>

          {jobs.map(j => (
            <div key={j.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
              <b>{j.kunde}</b> - {j.typ}<br/>
              Ort: {j.ort} | Zeit: {j.zeit} | Status: {j.status}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>Neuer Auftrag</h1>

          <input placeholder="Kunde" onChange={e => setForm({...form, kunde: e.target.value})} /><br/><br/>
          <input placeholder="Auftragstyp" onChange={e => setForm({...form, typ: e.target.value})} /><br/><br/>
          <input placeholder="Ort" onChange={e => setForm({...form, ort: e.target.value})} /><br/><br/>
          <input placeholder="Zeit" onChange={e => setForm({...form, zeit: e.target.value})} /><br/><br/>

          <button onClick={addJob}>Speichern</button>
          <button onClick={() => setView('dashboard')}>Zurück</button>
        </div>
      )}
    </div>
  )
}
