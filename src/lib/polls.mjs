const basePolls = [
  {
    institute: 'TNS-Sifo',
    dates: '2/10 - 12/10',
    parties: {
      M: '18.6',
      L: '6.1',
      C: '12.3',
      KD: '2.9',
      S: '30.5',
      V: '8.3',
      MP: '3.8',
      SD: '15',
      FI: '1.1',
      Ö: '1.4',
    },
  },
  {
    institute: 'Sentio',
    dates: '5/10 - 9/10',
    parties: {
      M: '16.8',
      L: '5.5',
      C: '9.6',
      KD: '2.3',
      S: '25.9',
      V: '8.8',
      MP: '4',
      SD: '22.8',
      FI: '1.9',
      Ö: '2.4',
    },
  },
  {
    institute: 'Inizio',
    dates: '3/10 - 9/10',
    parties: {
      M: '18.7',
      L: '3.7',
      C: '11.5',
      KD: '4.4',
      S: '30.1',
      V: '6.6',
      MP: '3.2',
      SD: '17.9',
      FI: '1.7',
      Ö: '2.2',
    },
  },
  {
    institute: 'Novus',
    dates: '4/9 - 1/10',
    parties: {
      M: '16.2',
      L: '6.4',
      C: '12.5',
      KD: '3.5',
      S: '29.4',
      V: '7.9',
      MP: '4.3',
      SD: '17.5',
      FI: '0',
      Ö: '2.3',
    },
  },
  {
    institute: 'Demoskop',
    dates: '24/9 - 1/10',
    parties: {
      M: '17.2',
      L: '4.5',
      C: '12.6',
      KD: '3.7',
      S: '32.1',
      V: '7.9',
      MP: '4.4',
      SD: '15.3',
      FI: '1.6',
      Ö: '0.7',
    },
  },
  {
    institute: 'Ipsos',
    dates: '7/9 - 18/9',
    parties: {
      M: '16',
      L: '6',
      C: '13',
      KD: '3',
      S: '29',
      V: '7',
      MP: '4',
      SD: '18',
      FI: '3',
      Ö: '1',
    },
  },
  {
    institute: 'YouGov',
    dates: '14/9 - 18/9',
    parties: {
      M: '16',
      L: '5.5',
      C: '9.4',
      KD: '3.1',
      S: '26.3',
      V: '7.5',
      MP: '3.1',
      SD: '25.3',
      FI: '2',
      Ö: '1.8',
    },
  },
  {
    institute: 'TNS-Sifo',
    dates: '4/9 - 14/9',
    parties: {
      M: '17.2',
      L: '5',
      C: '11.9',
      KD: '3.7',
      S: '29.7',
      V: '7.4',
      MP: '4.5',
      SD: '17.8',
      FI: '2',
      Ö: '0.8',
    },
  },
  {
    institute: 'Sentio',
    dates: '8/9 - 11/9',
    parties: {
      M: '17',
      L: '4.7',
      C: '11.5',
      KD: '3.1',
      S: '25.3',
      V: '6.9',
      MP: '4.1',
      SD: '23.4',
      FI: '2.8',
      Ö: '1.2',
    },
  },
]

const timeout = (ms) => new Promise((resolve) => setTimeout(() => resolve))

const fetchPolls = () =>
  fetch('/polls')
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      return Promise.resolve(basePolls)
    })

const fetchValnatt = () =>
  Promise.race([fetch('/valnatt'), timeout(3000)])
    .then((res) => res.json())
    .catch(
      (err) => console.error('valnatt error', err) || Promise.resolve(basePolls)
    )

export default {
  fetchPolls,
  fetchValnatt,
}
