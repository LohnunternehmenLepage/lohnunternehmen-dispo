import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://fzaxlqarqestccoktdft.supabase.co',
  'sb_publishable_j226JRfSven0KMeA9zzjMA_DuKX1nP0'
)

export default function App() {  const [jobs, setJobs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    kunde: "",
    typ: "",
    ort: "",
    zeit: ""
  })

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
    setJobs(data || [])
  }

  const addJob = async () => {
    if (!form.kunde) {
      alert("Bitte Kunde eintragen")
      return
    }

    await supabase.from('jobs').insert([
      {
        kunde: form.kunde,
        typ: form.typ,
        ort: form.ort,
        zeit: form.zeit,
        status: "Neu"
      }
    ])

    setForm({
      kunde: "",
      typ: "",
      ort: "",
      zeit: ""
    })

    setShowForm(false)
    loadJobs()
  }

  return (
    <div style={{padding: 20, fontFamily: "Arial"}}>
      <h1>Lohnunternehmen Dispo Dashboard</h1>

      {!showForm ? (
        <>
          <button onClick={() => setShowForm(true)}>Neuer Auftrag</button>

          <div style={{marginTop: 20}}>
            {jobs.map(job => (
              <div key={job.id} style={{
                border: "1px solid #ccc",
                padding: 15,
                marginBottom: 10
              }}>
                <strong>{job.kunde}</strong><br/>
                Auftrag: {job.typ}<br/>
                Ort: {job.ort}<br/>
                Zeit: {job.zeit}<br/>
                Status: {job.status}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Neuer Auftrag</h2>

          <input placeholder="Kunde"
            value={form.kunde}
            onChange={(e)=>setForm({...form, kunde:e.target.value})}
          /><br/><br/>

          <input placeholder="Auftragstyp"
            value={form.typ}
            onChange={(e)=>setForm({...form, typ:e.target.value})}
          /><br/><br/>

          <input placeholder="Ort"
            value={form.ort}
            onChange={(e)=>setForm({...form, ort:e.target.value})}
          /><br/><br/>

          <input placeholder="Zeit"
            value={form.zeit}
            onChange={(e)=>setForm({...form, zeit:e.target.value})}
          /><br/><br/>

          <button onClick={addJob}>Speichern</button>
          <button onClick={() => setShowForm(false)}>Zurück</button>
        </>
      )}
    </div>
  )
}
