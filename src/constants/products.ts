export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  featured: boolean;
  rating: number;
  specs: { [key: string]: string };
  stock: { [branchId: string]: number }; // branchId -> stock quantity
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Juego de Vasos de Vidrio Premium (6 pzs)",
    category: "Cocina y Mesa",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    description: "Elegante juego de 6 vasos de vidrio templado de alta resistencia. Ideal para el uso diario o para tus reuniones familiares. Fácil de limpiar y apto para lavavajillas.",
    featured: true,
    rating: 4.8,
    specs: {
      "Material": "Vidrio Templado",
      "Piezas": "6 unidades",
      "Capacidad": "350 ml",
      "Origen": "Importado"
    },
    stock: {
      "valencia-bolivar": 120,
      "valencia-metropolis": 85,
      "caracas-sabanagrande": 150,
      "caracas-chacao": 95,
      "barquisimeto-centro": 60,
      "maracay-bolivar": 40
    }
  },
  {
    id: "p2",
    name: "Organizador de Plástico Multiusos con Tapa",
    category: "Organización",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=600",
    description: "Caja organizadora transparente de plástico resistente con asas de cierre hermético. Perfecta para organizar clósets, juguetes, despensa o herramientas de manera eficiente.",
    featured: true,
    rating: 4.5,
    specs: {
      "Material": "Plástico Libre de BPA",
      "Capacidad": "15 Litros",
      "Color": "Transparente con cierres verdes",
      "Dimensiones": "40 x 30 x 18 cm"
    },
    stock: {
      "valencia-bolivar": 250,
      "valencia-metropolis": 300,
      "caracas-sabanagrande": 180,
      "caracas-chacao": 140,
      "barquisimeto-centro": 90,
      "maracay-bolivar": 110
    }
  },
  {
    id: "p3",
    name: "Sartén Antiadherente de Aluminio de 24cm",
    category: "Cocina y Mesa",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600",
    description: "Sartén de aluminio con doble revestimiento antiadherente de alta calidad. Mango ergonómico de baquelita de tacto frío para evitar quemaduras. Distribución de calor rápida y uniforme.",
    featured: true,
    rating: 4.7,
    specs: {
      "Diámetro": "24 cm",
      "Material": "Aluminio fundido",
      "Antiadherente": "Sí, teflón reforzado",
      "Mango": "Baquelita atérmica"
    },
    stock: {
      "valencia-bolivar": 45,
      "valencia-metropolis": 12,
      "caracas-sabanagrande": 67,
      "caracas-chacao": 0, // Out of stock here!
      "barquisimeto-centro": 35,
      "maracay-bolivar": 28
    }
  },
  {
    id: "p4",
    name: "Set de Cojines Decorativos Sofá (2 pzs)",
    category: "Hogar y Decoración",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=600",
    description: "Añade calidez y frescura a tu sala con este par de cojines ultra suaves. Fundas removibles con cremallera invisible para un lavado súper fácil. Relleno acolchado hipoalergénico incluído.",
    featured: false,
    rating: 4.2,
    specs: {
      "Medidas": "45 x 45 cm",
      "Diseño": "Geométrico moderno",
      "Relleno": "Fibra de poliéster siliconada",
      "Funda": "Algodón / Poliéster"
    },
    stock: {
      "valencia-bolivar": 15,
      "valencia-metropolis": 30,
      "caracas-sabanagrande": 22,
      "caracas-chacao": 18,
      "barquisimeto-centro": 10,
      "maracay-bolivar": 14
    }
  },
  {
    id: "p5",
    name: "Lámpara de Mesa LED Minimalista USB",
    category: "Hogar y Decoración",
    price: 11.50,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
    description: "Lámpara recargable con panel táctil y 3 niveles de brillo regulables. Ideal para tu mesa de noche, estudio o rincón de lectura. Incluye cable USB de carga rápida.",
    featured: true,
    rating: 4.6,
    specs: {
      "Brillo": "Regulable (Táctil)",
      "Autonomía": "Hasta 10 horas",
      "Batería": "1200 mAh recargable",
      "Puerto": "USB-C"
    },
    stock: {
      "valencia-bolivar": 5,
      "valencia-metropolis": 8,
      "caracas-sabanagrande": 30,
      "caracas-chacao": 45,
      "barquisimeto-centro": 0,
      "maracay-bolivar": 12
    }
  },
  {
    id: "p6",
    name: "Termo de Acero Inoxidable de 1 Litro",
    category: "Cocina y Mesa",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600",
    description: "Termo con doble pared de aislamiento al vacío para mantener tus bebidas frías por 24 horas o calientes por 12 horas. Práctica tapa hermética a prueba de goteos.",
    featured: false,
    rating: 4.4,
    specs: {
      "Capacidad": "1 Litro",
      "Aislamiento": "Doble pared metálica",
      "Material": "Acero Inoxidable 18/8",
      "Colores": "Negro mate, Verde menta, Gris"
    },
    stock: {
      "valencia-bolivar": 88,
      "valencia-metropolis": 40,
      "caracas-sabanagrande": 110,
      "caracas-chacao": 65,
      "barquisimeto-centro": 42,
      "maracay-bolivar": 55
    }
  },
  {
    id: "p7",
    name: "Set de Bloques de Construcción Infantil",
    category: "Juguetería",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600",
    description: "Promueve la imaginación y habilidades motoras de los consentidos de la casa con este set de bloques de colores estimulantes. Piezas grandes seguras para niños +3 años.",
    featured: false,
    rating: 4.9,
    specs: {
      "Piezas": "80 bloques con bolsa",
      "Edad Recomendada": "+3 años",
      "Material": "Plástico no tóxico",
      "Seguridad": "Bordes redondeados"
    },
    stock: {
      "valencia-bolivar": 110,
      "valencia-metropolis": 60,
      "caracas-sabanagrande": 85,
      "caracas-chacao": 70,
      "barquisimeto-centro": 105,
      "maracay-bolivar": 90
    }
  },
  {
    id: "p8",
    name: "Planta Artificial con Maceta de Cerámica",
    category: "Hogar y Decoración",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=600",
    description: "Dale un toque verde a tu escritorio, estudio o baño sin preocuparte por el riego. Suculenta artificial con textura realista en una hermosa macetería de cerámica geométrica.",
    featured: false,
    rating: 4.1,
    specs: {
      "Tipo": "Suculenta artificial",
      "Maceta": "Cerámica esmaltada",
      "Altura total": "15 cm",
      "Mantenimiento": "Limpieza con paño seco"
    },
    stock: {
      "valencia-bolivar": 140,
      "valencia-metropolis": 160,
      "caracas-sabanagrande": 190,
      "caracas-chacao": 100,
      "barquisimeto-centro": 65,
      "maracay-bolivar": 75
    }
  }
];
