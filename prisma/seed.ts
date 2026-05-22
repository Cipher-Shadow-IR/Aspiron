import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.predictionRule.deleteMany({});
  await prisma.college.deleteMany({});

  console.log('Seeding colleges...');

  const collegesData = [
    {
      name: 'Indian Institute of Technology, Bombay (IIT Bombay)',
      city: 'Mumbai',
      state: 'Maharashtra',
      fees: 220000,
      rating: 4.9,
      placementPercentage: 97.5,
      avgPackage: 21.8,
      highestPackage: 150.0,
      courses: [
        'B.Tech Computer Science and Engineering',
        'B.Tech Electrical Engineering',
        'B.Tech Mechanical Engineering',
        'B.Tech Aerospace Engineering'
      ],
      description: 'Established in 1958, IIT Bombay is a premier public technical and research university located in Powai, Mumbai. It is globally recognized for its academic excellence, cutting-edge research, and top-tier placements.',
      examAccepted: ['JEE Main'],
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 1, maxRank: 500 }
        ]
      }
    },
    {
      name: 'Indian Institute of Technology, Delhi (IIT Delhi)',
      city: 'New Delhi',
      state: 'Delhi',
      fees: 225000,
      rating: 4.8,
      placementPercentage: 96.2,
      avgPackage: 20.5,
      highestPackage: 125.0,
      courses: [
        'B.Tech Computer Science and Engineering',
        'B.Tech Mathematics and Computing',
        'B.Tech Electrical Engineering',
        'B.Tech Chemical Engineering'
      ],
      description: 'IIT Delhi is a prestigious public research university located in New Delhi, India. It is one of the oldest IITs and is consistently ranked among the top engineering institutions in the country.',
      examAccepted: ['JEE Main'],
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 1, maxRank: 600 }
        ]
      }
    },
    {
      name: 'National Institute of Technology, Trichy (NIT Trichy)',
      city: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      fees: 145000,
      rating: 4.6,
      placementPercentage: 92.0,
      avgPackage: 15.4,
      highestPackage: 75.0,
      courses: [
        'B.Tech Computer Science and Engineering',
        'B.Tech Electronics and Communication Engineering',
        'B.Tech Electrical and Electronics Engineering',
        'B.Tech Civil Engineering'
      ],
      description: 'National Institute of Technology, Tiruchirappalli is a public technical and research university. It is widely regarded as the top NIT in India, offering outstanding academic and placement opportunities.',
      examAccepted: ['JEE Main'],
      imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 200, maxRank: 4000 }
        ]
      }
    },
    {
      name: 'National Institute of Technology, Surathkal (NIT Surathkal)',
      city: 'Mangaluru',
      state: 'Karnataka',
      fees: 150000,
      rating: 4.5,
      placementPercentage: 91.5,
      avgPackage: 14.8,
      highestPackage: 68.0,
      courses: [
        'B.Tech Computer Science and Engineering',
        'B.Tech Information Technology',
        'B.Tech Electronics and Communication Engineering',
        'B.Tech Mining Engineering'
      ],
      description: 'NITK Surathkal is a premier public engineering university located on a beautiful beachside campus in Mangaluru, Karnataka. It has a stellar reputation for engineering studies and research.',
      examAccepted: ['JEE Main'],
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 300, maxRank: 5000 }
        ]
      }
    },
    {
      name: 'Motilal Nehru National Institute of Technology (MNNIT)',
      city: 'Allahabad',
      state: 'Uttar Pradesh',
      fees: 135000,
      rating: 4.3,
      placementPercentage: 89.0,
      avgPackage: 12.5,
      highestPackage: 55.0,
      courses: [
        'B.Tech Computer Science and Engineering',
        'B.Tech Information Technology',
        'B.Tech Electrical Engineering'
      ],
      description: 'MNNIT Allahabad is a top-tier national institute located in Prayagraj, UP. Known for its strong computer science department and excellent technical culture.',
      examAccepted: ['JEE Main'],
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 1000, maxRank: 8000 }
        ]
      }
    },
    {
      name: 'Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)',
      city: 'Gandhinagar',
      state: 'Gujarat',
      fees: 220000,
      rating: 4.4,
      placementPercentage: 92.5,
      avgPackage: 16.0,
      highestPackage: 52.0,
      courses: [
        'B.Tech Information and Communication Technology',
        'B.Tech ICT with Minors in Computational Science',
        'B.Tech Honors in ICT with AR/VR'
      ],
      description: 'DA-IICT is a prestigious technological university in Gandhinagar, Gujarat. Established by the Dhirubhai Ambani Foundation, it is known for pioneering ICT education in India and having excellent connections with major industries.',
      examAccepted: ['JEE Main', 'GUJCET'],
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 1000, maxRank: 15000 },
          { exam: 'GUJCET', minRank: 50, maxRank: 1200 }
        ]
      }
    },
    {
      name: 'Malaviya National Institute of Technology (MNIT)',
      city: 'Jaipur',
      state: 'Rajasthan',
      fees: 140000,
      rating: 4.2,
      placementPercentage: 87.0,
      avgPackage: 11.8,
      highestPackage: 48.0,
      courses: [
        'B.Tech Computer Science and Engineering',
        'B.Tech Electronics and Communication Engineering',
        'B.Tech Metallurgical and Materials Engineering'
      ],
      description: 'MNIT Jaipur is a premier public institute located in the heritage city of Jaipur. It offers top-class infrastructure, research laboratories, and active student clubs.',
      examAccepted: ['JEE Main'],
      imageUrl: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 1500, maxRank: 10000 }
        ]
      }
    },
    {
      name: 'Indian Institute of Information Technology (IIIT), Vadodara',
      city: 'Vadodara',
      state: 'Gujarat',
      fees: 180000,
      rating: 4.1,
      placementPercentage: 89.5,
      avgPackage: 13.2,
      highestPackage: 44.0,
      courses: [
        'B.Tech Computer Science and Engineering',
        'B.Tech Information Technology'
      ],
      description: 'IIIT Vadodara is one of the IIITs set up by the Ministry of Education, Government of India. It operates under a public-private partnership model and has gained massive recognition for its placement records.',
      examAccepted: ['JEE Main'],
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 5000, maxRank: 22000 }
        ]
      }
    },
    {
      name: 'Indian Institute of Information Technology (IIIT), Surat',
      city: 'Surat',
      state: 'Gujarat',
      fees: 175000,
      rating: 4.0,
      placementPercentage: 86.0,
      avgPackage: 11.5,
      highestPackage: 42.0,
      courses: [
        'B.Tech Computer Science and Engineering',
        'B.Tech Electronics and Communication Engineering'
      ],
      description: 'IIIT Surat is an institute of national importance established in PPP mode. It offers specialized degrees in IT fields and focuses on research and industrial training.',
      examAccepted: ['JEE Main'],
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 6000, maxRank: 24000 }
        ]
      }
    },
    {
      name: 'Nirma University (ITNU)',
      city: 'Ahmedabad',
      state: 'Gujarat',
      fees: 200000,
      rating: 4.2,
      placementPercentage: 88.0,
      avgPackage: 8.5,
      highestPackage: 32.0,
      courses: [
        'B.Tech Computer Science and Engineering',
        'B.Tech Information Technology',
        'B.Tech Electronics and Communication',
        'B.Tech Mechanical Engineering'
      ],
      description: 'Nirma University is a major private university located in Ahmedabad, Gujarat. Its Institute of Technology is highly ranked and preferred by students for its academic discipline and industry placement tie-ups.',
      examAccepted: ['JEE Main', 'GUJCET'],
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 10000, maxRank: 35000 },
          { exam: 'GUJCET', minRank: 800, maxRank: 4500 }
        ]
      }
    },
    {
      name: 'L.D. College of Engineering (LDCE)',
      city: 'Ahmedabad',
      state: 'Gujarat',
      fees: 2500,
      rating: 4.1,
      placementPercentage: 82.0,
      avgPackage: 6.0,
      highestPackage: 20.0,
      courses: [
        'B.E. Computer Engineering',
        'B.E. Information Technology',
        'B.E. Mechanical Engineering',
        'B.E. Chemical Engineering'
      ],
      description: 'LDCE is a premier government engineering college in Gujarat, founded in 1948. It is known for its incredibly affordable fees, vast alumni network, and excellent core-engineering placements.',
      examAccepted: ['GUJCET'],
      imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'GUJCET', minRank: 100, maxRank: 3000 }
        ]
      }
    },
    {
      name: 'Pandit Deendayal Energy University (PDEU)',
      city: 'Gandhinagar',
      state: 'Gujarat',
      fees: 245000,
      rating: 4.2,
      placementPercentage: 85.0,
      avgPackage: 7.8,
      highestPackage: 25.0,
      courses: [
        'B.Tech Petroleum Engineering',
        'B.Tech Computer Engineering',
        'B.Tech Information and Communication Technology'
      ],
      description: 'PDEU Gandhinagar is a highly reputed university focusing on energy, technology, and management domains. It has an excellent research ecosystem and ties with energy conglomerates.',
      examAccepted: ['JEE Main', 'GUJCET'],
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 12000, maxRank: 40000 },
          { exam: 'GUJCET', minRank: 1000, maxRank: 5000 }
        ]
      }
    },
    {
      name: 'Dharmsinh Desai University (DDU)',
      city: 'Nadiad',
      state: 'Gujarat',
      fees: 165000,
      rating: 3.9,
      placementPercentage: 84.0,
      avgPackage: 7.2,
      highestPackage: 24.0,
      courses: [
        'B.Tech Computer Engineering',
        'B.Tech Information Technology',
        'B.Tech Chemical Engineering'
      ],
      description: 'DDU is a prominent university located in Nadiad, Gujarat. Known for its rigorous academic curriculum and excellent practical training in computer engineering.',
      examAccepted: ['JEE Main', 'GUJCET'],
      imageUrl: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 15000, maxRank: 45000 },
          { exam: 'GUJCET', minRank: 1200, maxRank: 6000 }
        ]
      }
    },
    {
      name: 'Birla Vishvakarma Mahavidyalaya (BVM)',
      city: 'Anand',
      state: 'Gujarat',
      fees: 130000,
      rating: 4.0,
      placementPercentage: 80.0,
      avgPackage: 5.8,
      highestPackage: 18.0,
      courses: [
        'B.E. Computer Engineering',
        'B.E. Information Technology',
        'B.E. Civil Engineering'
      ],
      description: 'BVM is Gujarat\'s first engineering college, established in 1948. Located in the educational hub of Vallabh Vidyanagar (Anand), it is highly respected for producing top-class engineers.',
      examAccepted: ['GUJCET'],
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'GUJCET', minRank: 1000, maxRank: 5500 }
        ]
      }
    },
    {
      name: 'Vishwakarma Government Engineering College (VGEC)',
      city: 'Ahmedabad',
      state: 'Gujarat',
      fees: 2000,
      rating: 3.9,
      placementPercentage: 78.0,
      avgPackage: 5.2,
      highestPackage: 15.0,
      courses: [
        'B.E. Computer Engineering',
        'B.E. Information Technology',
        'B.E. Power Electronics'
      ],
      description: 'VGEC is a government engineering college located in Chandkheda, Ahmedabad. Affiliated with GTU, it provides good campus placements and state-of-the-art laboratory facilities.',
      examAccepted: ['GUJCET'],
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'GUJCET', minRank: 1500, maxRank: 7000 }
        ]
      }
    },
    {
      name: 'Charotar University of Science and Technology (CHARUSAT)',
      city: 'Changa',
      state: 'Gujarat',
      fees: 125000,
      rating: 3.8,
      placementPercentage: 81.0,
      avgPackage: 5.0,
      highestPackage: 16.0,
      courses: [
        'B.Tech Computer Science and Engineering',
        'B.Tech Information Technology'
      ],
      description: 'CHARUSAT is a private university located in the rural setting of Changa. It boasts a beautiful campus and focuses on research, student internships, and innovation.',
      examAccepted: ['JEE Main', 'GUJCET'],
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 25000, maxRank: 60000 },
          { exam: 'GUJCET', minRank: 2000, maxRank: 12000 }
        ]
      }
    },
    {
      name: 'Adani University',
      city: 'Ahmedabad',
      state: 'Gujarat',
      fees: 180000,
      rating: 3.8,
      placementPercentage: 75.0,
      avgPackage: 4.8,
      highestPackage: 12.0,
      courses: [
        'B.Tech Information and Communication Technology',
        'B.Tech Civil and Infrastructure Engineering'
      ],
      description: 'Adani University, supported by the Adani Group, provides education tailored for infrastructure and transport management along with technology and engineering courses.',
      examAccepted: ['JEE Main', 'GUJCET'],
      imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 30000, maxRank: 80000 },
          { exam: 'GUJCET', minRank: 3000, maxRank: 15000 }
        ]
      }
    },
    {
      name: 'Silver Oak University',
      city: 'Ahmedabad',
      state: 'Gujarat',
      fees: 78000,
      rating: 3.5,
      placementPercentage: 70.0,
      avgPackage: 4.0,
      highestPackage: 10.0,
      courses: [
        'B.Tech Computer Engineering',
        'B.Tech Information Technology',
        'B.Tech Civil Engineering'
      ],
      description: 'Silver Oak University is a private university in Ahmedabad. It offers a large variety of undergraduate courses with a focus on affordable technical education.',
      examAccepted: ['JEE Main', 'GUJCET'],
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
      predictionRules: {
        create: [
          { exam: 'JEE Main', minRank: 40000, maxRank: 120000 },
          { exam: 'GUJCET', minRank: 5000, maxRank: 25000 }
        ]
      }
    }
  ];

  for (const college of collegesData) {
    const createdCollege = await prisma.college.create({
      data: college
    });
    console.log(`Created college: ${createdCollege.name}`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
