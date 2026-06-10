export interface Branch {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const BRANCHES: Branch[] = [
  {
    id: "valencia-bolivar",
    name: "Mango Bajito Av. Bolívar Norte",
    city: "Valencia",
    state: "Carabobo",
    address: "Av. Bolívar Norte, frente al Rectorado de la UC, Valencia, Edo. Carabobo",
    phone: "+58 (241) 857-1122",
    hours: "Lunes a Sábado: 8:30 AM - 7:00 PM | Domingo: 10:00 AM - 5:00 PM",
    coordinates: {
      lat: 10.2015,
      lng: -68.0031,
    }
  },
  {
    id: "valencia-metropolis",
    name: "Mango Bajito C.C. Metrópolis",
    city: "Valencia",
    state: "Carabobo",
    address: "C.C. Metrópolis Valencia, Nivel Autopista, Local M-122",
    phone: "+58 (241) 839-4455",
    hours: "Lunes a Domingo: 10:00 AM - 9:00 PM",
    coordinates: {
      lat: 10.1652,
      lng: -67.9423,
    }
  },
  {
    id: "caracas-sabanagrande",
    name: "Mango Bajito Sabana Grande",
    city: "Caracas",
    state: "Distrito Capital",
    address: "Bulevar de Sabana Grande, Edificio Mango Bajito, Caracas",
    phone: "+58 (212) 762-8899",
    hours: "Lunes a Sábado: 9:00 AM - 7:30 PM | Domingo: 11:00 AM - 6:00 PM",
    coordinates: {
      lat: 10.4912,
      lng: -66.8805,
    }
  },
  {
    id: "caracas-chacao",
    name: "Mango Bajito Chacao",
    city: "Caracas",
    state: "Distrito Capital",
    address: "Av. Francisco de Miranda, diagonal al C.C. Sambil, Chacao, Caracas",
    phone: "+58 (212) 261-3344",
    hours: "Lunes a Sábado: 9:00 AM - 8:00 PM | Domingo: 10:00 AM - 6:00 PM",
    coordinates: {
      lat: 10.4938,
      lng: -66.8550,
    }
  },
  {
    id: "barquisimeto-centro",
    name: "Mango Bajito Barquisimeto Centro",
    city: "Barquisimeto",
    state: "Lara",
    address: "Carrera 19, entre Calles 25 y 26, Barquisimeto",
    phone: "+58 (251) 231-7788",
    hours: "Lunes a Sábado: 8:30 AM - 6:30 PM",
    coordinates: {
      lat: 10.0682,
      lng: -69.3148,
    }
  },
  {
    id: "maracay-bolivar",
    name: "Mango Bajito Av. Bolívar",
    city: "Maracay",
    state: "Aragua",
    address: "Av. Bolívar Este, Sector Centro, Maracay",
    phone: "+58 (243) 233-5566",
    hours: "Lunes a Sábado: 9:00 AM - 7:00 PM | Domingo: 10:00 AM - 5:00 PM",
    coordinates: {
      lat: 10.2469,
      lng: -67.5958,
    }
  }
];
