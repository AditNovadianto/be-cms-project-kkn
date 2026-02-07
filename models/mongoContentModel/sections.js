import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    idSection: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: [
        "beranda",
        "demografi",
        "peta_wilayah",
        "visi_misi",
        "batas_wilayah",
        "pemerintahan",
        "potensi",
        "sejarah",
        "wisata",
        "sarana_prasarana",
        "galeri",
      ],
      required: true,
    },

    // Beranda
    title: String,
    subtitle: String,
    tagline: String,
    description: String,
    heroImage: {
      url: String,
      alt: String,
    },

    // Demografi
    jumlahPenduduk: String,
    lakiLaki: String,
    perempuan: String,
    kepalaKeluarga: String,

    // Peta Wilayah
    luasWilayah: String,
    polaPemukiman: String,
    jaringanJalan: String,
    kondisiWilayah: String,
    skalaPeta: String,

    // Visi dan Misi
    visi: String,
    misi: [String],

    // Batas Wilayah
    batasUtara: String,
    batasSelatan: String,
    batasTimur: String,
    batasBarat: String,

    // Pemerintahan
    kepalaDesa: String,
    sekretarisDesa: String,
    item: [
      {
        name: String,
        description: String,
      },
    ],

    // Potensi
    potensi: [
      {
        name: String,
        description: String,
      },
    ],

    // Sejarah
    timeline: [
      {
        year: String, // "Sebelum 1948", "1961", "1961 - 1965"
        title: String, // Judul card / event
        description: String, // Paragraf pembuka

        items: [String], // Bullet list (opsional)

        note: String, // Paragraf penutup (opsional)

        groups: [
          // Untuk struktur kompleks (opsional)
          {
            subtitle: String, // Contoh: "Desa Allakuang"
            list: [
              {
                name: String, // Nama tokoh / item
                period: String, // Periode jabatan
              },
            ],
          },
        ],
      },
    ],

    // Wisata
    wisata: [
      {
        title: String,
        description: String,
        image: {
          url: String,
          alt: String,
        },
      },
    ],
    link: String,

    // Sarana dan Prasarana
    saranaPrasarana: [
      {
        title: String,
        description: String,
        image: {
          url: String,
          alt: String,
        },
      },
    ],

    // Galeri
    gallery: [
      {
        url: String,
        alt: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    updatedBy: {
      type: String,
      default: "system",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Section", sectionSchema);
