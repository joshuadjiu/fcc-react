import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { User, CheckCircle, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"

export default function SASCStaff() {
  const [activePage, setActivePage] = useState("pembina");
  const [searchPeriode, setSearchPeriode] = useState("");
  const [searchNama, setSearchNama] = useState("");
  const [searchNamaStudent, setSearchNamaStudent] = useState("");
  const [searchPembina, setSearchPembina] = useState("");
  const [searchBuddy, setSearchBuddy] = useState("");

  const [searchSouvenirPeriode, setSearchSouvenirPeriode] = useState("");
  const [searchSouvenirNim, setSearchSouvenirNim] = useState("");
  const [searchSouvenirArea, setSearchSouvenirArea] = useState("");

  // Data pembina
  const [pembinaList, setPembinaList] = useState([]);

  const [formPembina, setFormPembina] = useState({
    nama: "",
    binusianId: "",
    area: "",
    pic: ""
  });

  // Data counselor
  const [dataInputCounselor, setDataInputCounselor] = useState([]);
  const [formCounselor, setFormCounselor] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    area: "",
    fakultas: "",
    periode: ""
  });
  const [searchCounselor, setSearchCounselor] = useState("");

  // Data partner
  const [dataInputPartner, setDataInputPartner] = useState([]);
  const [formPartner, setFormPartner] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    area: "",
    fakultas: "",
    periode: ""
  });
  const [searchPartner, setSearchPartner] = useState("");

  // Data creative team
  const [dataInputCreativeTeam, setDataInputCreativeTeam] = useState([]);
  const [formCreativeTeam, setFormCreativeTeam] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    area: "",
    fakultas: "",
    periode: ""
  });
  const [searchCreativeTeam, setSearchCreativeTeam] = useState("");

  // Data peran (peer counselor, peer partner, dan creatuve team) diverifikasi oleh SASC Staff
  const [dataCounselor, setDataCounselor] = useState([]);
  const [dataPartner, setDataPartner] = useState([]);
  const [dataCreative, setDataCreative] = useState([]);

  const [dataBuddy, setDataBuddy] = useState([]);
  const [formBuddy, setFormBuddy] = useState({ nim: "", nama: "", jurusan: "", partnerNim: "", roleNim: "", roleType: "" });

  const [studentAccounts, setStudentAccounts] = useState(
    JSON.parse(localStorage.getItem("studentAccounts")) || []
  );

  const [formStudentLogin, setFormStudentLogin] = useState({
    username: "",
    password: "",
    nim: "",
    nama: ""
  });

  const [notif, setNotif] = useState({ show: false, message: "", type: "" });

  const [evalData, setEvalData] = useState({
    evaluations: [],
    questionnaires: []
  });

  const [inputEval, setInputEval] = useState({ title: "", link: "", role: "" });
  const [inputKues, setInputKues] = useState({ title: "", link: "", role: "" });
  const [editIndexEval, setEditIndexEval] = useState(null);
  const [editIndexKues, setEditIndexKues] = useState(null);

  const [isChanged, setIsChanged] = useState(false);

  // Data user dengan proses penambahan secara manual pada bagian checklist pengambilan souvenir
  const [dataCounselorSouvenir, setDataCounselorSouvenir] = useState(
    JSON.parse(localStorage.getItem("counselorSouvenirData")) || []
  );

  const [dataPartnerSouvenir, setDataPartnerSouvenir] = useState(
    JSON.parse(localStorage.getItem("partnerSouvenirData")) || []
  );

  const [dataCreativeSouvenir, setDataCreativeSouvenir] = useState(
    JSON.parse(localStorage.getItem("creativeSouvenirData")) || []
  );

  const navigate = useNavigate();
    
  const handleLogout = () => {
    navigate("/login");
  };

  // Struktur kolom pada tabel untuk tiap role
  const columnsByRole = {
    "Peer Counselor": [
      "periode",
      "kampus",
      "nim",
      "nama",
      "jurusan",
      "kampusArea",
      "tanggalKonseling",
      "jamMulai",
      "jamSelesai",
      "durasi",
      "metode",
      "deskripsi",
      "kendala",
      "supportNeeded",
      "statusCase",
      "verifikasi",
      "komentarStaff",
    ],

    "Peer Partner": [
      "periode",
      "kampus",
      "nimBuddy",
      "namaBuddy",
      "jurusan",
      "partnerNama",
      "pendamping",
      "tanggal",
      "jamMulai",
      "jamSelesai",
      "durasi",
      "metode",
      "deskripsi",
      "kendala",
      "support",
      "verifikasi",
      "komentarStaff",
    ],

    "Creative Team": [
      "periode",
      "pembina",
      "topik",
      // "statusTopik",
      "tanggalDiskusi",
      "mediaDiskusi",
      "hasilDiskusi",
      "status",
      "linkIG",
      "verifikasi",
      "komentarStaff"
    ]
  };

  // Melakukan proses atau load data dari localstorage
  useEffect(() => {
    const savedCounselor = JSON.parse(localStorage.getItem("counselorData")) || [];
    const savedPartner = JSON.parse(localStorage.getItem("partnerData")) || [];
    const savedBuddy = JSON.parse(localStorage.getItem("buddyData")) || [];
    const savedCreative = JSON.parse(localStorage.getItem("creativeData")) || [];
    const savedPembina = JSON.parse(localStorage.getItem("pembinaList")) || [];
    const savedEvaluationQuestionnaire =
      JSON.parse(localStorage.getItem("evaluationData")) || {};

    setEvalData({
      evaluations: savedEvaluationQuestionnaire.evaluations || [],
      questionnaires: savedEvaluationQuestionnaire.questionnaires || []
    });

    const updatedCounselor = savedCounselor.map((item) => ({
      ...item,
      status: item.status || "Menunggu",
    }));

    const updatedPartner = savedPartner.map((item) => ({
      ...item,
      status: item.status || "Menunggu",
    }));

    const updatedCreative = savedCreative.map((item) => ({
      ...item,
      status: item.status || "Menunggu",
    }));

    setDataInputCounselor(JSON.parse(localStorage.getItem("inputCounselor")) || []);
    setDataInputPartner(JSON.parse(localStorage.getItem("inputPartner")) || []);
    setDataInputCreativeTeam(JSON.parse(localStorage.getItem("inputCreativeTeam")) || []);
    
    setDataCounselor(updatedCounselor);
    setDataPartner(updatedPartner);
    setDataBuddy(savedBuddy);
    setDataCreative(updatedCreative);
    setPembinaList(savedPembina);
  }, []);

  const saveEvaluasi = async () => {
    // Validasi wajib isi
    if (!inputEval.role || !inputEval.title || !inputEval.link) {
      Swal.fire({
        icon: "warning",
        title: "Kolom Belum Lengkap",
        text: "Semua kolom pada form Evaluasi wajib diisi!",
      });
      return;
    }

    // Konfirmasi
    const confirm = await Swal.fire({
      title: "Simpan Evaluasi?",
      text: "Pastikan data sudah benar sebelum disimpan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    // Simpan
    const updated = {
      ...evalData,
      evaluations: [
        ...evalData.evaluations,
        { title: inputEval.title, link: inputEval.link, role: inputEval.role }
      ]
    };

    setEvalData(updated);
    localStorage.setItem("evaluationData", JSON.stringify(updated));

    setInputEval({ title: "", link: "", role: "" });

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Evaluasi berhasil disimpan.",
    });
  };

  const saveKuesioner = async () => {
    // Validasi wajib isi
    if (!inputKues.role || !inputKues.title || !inputKues.link) {
      Swal.fire({
        icon: "warning",
        title: "Kolom Belum Lengkap",
        text: "Semua kolom pada form Kuesioner wajib diisi!",
      });
      return;
    }

    // Konfirmasi
    const confirm = await Swal.fire({
      title: "Simpan Kuesioner?",
      text: "Pastikan data sudah benar sebelum disimpan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    // Simpan
    const updated = {
      ...evalData,
      questionnaires: [
        ...evalData.questionnaires,
        { title: inputKues.title, link: inputKues.link, role: inputKues.role }
      ]
    };

    setEvalData(updated);
    localStorage.setItem("evaluationData", JSON.stringify(updated));

    setInputKues({ title: "", link: "", role: "" });

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Kuesioner berhasil disimpan.",
    });
  };

  const deleteEvaluasi = (index) => {
    Swal.fire({
      title: "Hapus Evaluasi?",
      text: "Apakah kamu yakin ingin menghapus evaluasi ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (!result.isConfirmed) return;

      const updated = {
        ...evalData,
        evaluations: evalData.evaluations.filter((_, i) => i !== index),
      };

      setEvalData(updated);
      localStorage.setItem("evaluationData", JSON.stringify(updated));

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Evaluasi berhasil dihapus.",
        timer: 1500,
        showConfirmButton: false,
      });
    });
  };

  const deleteKuesioner = (index) => {
    Swal.fire({
      title: "Hapus Kuesioner?",
      text: "Apakah kamu yakin ingin menghapus kuesioner ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (!result.isConfirmed) return;

      const updated = {
        ...evalData,
        questionnaires: evalData.questionnaires.filter((_, i) => i !== index),
      };

      setEvalData(updated);
      localStorage.setItem("evaluationData", JSON.stringify(updated));

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kuesioner berhasil dihapus.",
        timer: 1500,
        showConfirmButton: false,
      });
    });
  };

  // Notifikasi
  const showNotif = (message, type = "info") => {
    setNotif({ show: true, message, type });
    setTimeout(() => setNotif({ show: false, message: "", type: "" }), 2000);
  };

  // Fungsi update verifikasi, komentar, dan edit pada halaman peer counselor
  const updateVerifikasiCounselor = (index, statusType) => {
   
   Swal.fire({
    title: "Konfirmasi Terlebih Dahulu",
    text: `Anda akan memberi status: ${statusType.toUpperCase()}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, lanjutkan",
    cancelButtonText: "Batal",
   }).then((result) => {
    if(!result.isConfirmed) return;
   
    const updated = [...dataCounselor];
    if (!updated[index]) return;

    if (statusType === "setuju") {
      updated[index].status = "Disetujui";
      updated[index].verifikasi = true;
    } else if (statusType === "tidak") {
      updated[index].status = "Tidak Disetujui";
      updated[index].verifikasi = false;
    } else if (statusType === "decline") {
      updated[index].status = "Decline";
      updated[index].verifikasi = false;
    }

    setDataCounselor(updated);
    localStorage.setItem("counselorData", JSON.stringify(updated));
    setIsChanged(true);

    const notifText =
      statusType === "setuju"
        ? "Data logbook Disetujui ✅"
        : statusType === "tidak"
        ? "Data logbook Tidak Disetujui ❌"
        : "Data logbook diminta revisi (Decline) 🔁";

      showNotif(notifText, "info");
    });
  };

  const handleKomentarCounselor = (index, value) => {
    const updated = [...dataCounselor];
    updated[index].komentarStaff = value;
    setDataCounselor(updated);
    localStorage.setItem("counselorData", JSON.stringify(updated));
    setIsChanged(true);
  };

  const handleEditUlangCounselor = (index) => {
    const updated = [...dataCounselor];
    if (!updated[index]) return;

    // Reset beberapa kolom agar bisa diedit ulang
    updated[index].verifikasi = false;
    updated[index].status = "Menunggu";
    updated[index].komentarStaff = "";

    setDataCounselor(updated);
    localStorage.setItem("counselorData", JSON.stringify(updated));

    showNotif("Data dikembalikan untuk diperbaiki", "info");
  };

  // Fungsi update verifikasi, komentar, dan edit pada halaman peer partner
  const updateVerifikasiPartner = (index, statusType) => {
    
    Swal.fire({
      title: "Konfirmasi Terlebih Dahulu",
      text: `Anda akan memberi status: ${statusType.toUpperCase()}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if(!result.isConfirmed) return;
    
    const updated = [...dataPartner];
    if (!updated[index]) return;

    if (statusType === "setuju") {
      updated[index].status = "Disetujui";
      updated[index].verifikasi = true;
    } else if (statusType === "tidak") {
      updated[index].status = "Tidak Disetujui";
      updated[index].verifikasi = false;
    } else if (statusType === "decline") {
      updated[index].status = "Decline";
      updated[index].verifikasi = false;
    }

    setDataPartner(updated);
    localStorage.setItem("partnerData", JSON.stringify(updated));
    setIsChanged(true);

    const notifText =
      statusType === "setuju"
        ? "Data logbook Disetujui ✅"
        : statusType === "tidak"
        ? "Data logbook Tidak Disetujui ❌"
        : "Data logbook diminta revisi (Decline) 🔁";

        // Notifikasi
      showNotif(notifText, "info");
    });
  };

  const handleKomentarPartner = (index, value) => {
    const updated = [...dataPartner];
    updated[index].komentarStaff = value;
    setDataPartner(updated);
    localStorage.setItem("partnerData", JSON.stringify(updated));
    setIsChanged(true);
  };

  const handleEditUlangPartner = (index) => {
    const updated = [...dataPartner];
    if (!updated[index]) return;

    // Reset beberapa kolom agar bisa diedit ulang
    updated[index].verifikasi = false;
    updated[index].status = "Menunggu";
    updated[index].komentarStaff = "";

    setDataPartner(updated);
    localStorage.setItem("partnerData", JSON.stringify(updated));

    showNotif("Data dikembalikan untuk diperbaiki", "info");
  };

  // Fungsi update verifikasi, komentar dan edit pada halaman creative team
  const updateVerifikasiCreative = (index, statusType) => {
    
    Swal.fire({
      title: "Konfirmasi Terlebih Dahulu",
      text: `Anda akan memberi status: ${statusType.toUpperCase()}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (!result.isConfirmed) return;
    
    const updated = [...dataCreative];
    if (!updated[index]) return;

    if (statusType === "setuju") {
      updated[index].statusVerifikasi = "Disetujui";
      updated[index].verifikasi = true;
    } else if (statusType === "tidak") {
      updated[index].statusVerifikasi = "Tidak Disetujui";
      updated[index].verifikasi = false;
    } else if (statusType === "decline") {
      updated[index].statusVerifikasi = "Decline (Edit Ulang)";
      updated[index].verifikasi = false;
    }

    updated[index].komentarStaff = updated[index].komentarStaff || "";

    localStorage.setItem("creativeData", JSON.stringify(updated));
    setDataCreative(updated);
    setIsChanged(true);

    const notifText =
      statusType === "setuju"
        ? "Data logbook Disetujui ✅"
        : statusType === "tidak"
        ? "Data logbook Tidak Disetujui ❌"
        : "Data logbook diminta revisi (Decline) 🔁";

      // Notifikasi
      showNotif(notifText, "info");

      // Melakukan trigger update ke halaman Creative Team
      window.dispatchEvent(new Event("storage"));
    });
  };

  const handleKomentarCreative = (index, value) => {
    const updated = [...dataCreative];
    updated[index].komentarStaff = value;
    setDataCreative(updated);
    localStorage.setItem("creativeData", JSON.stringify(updated));
    setIsChanged(true);
  };

  const handleEditUlangCreative = (index) => {
    const updated = [...dataCreative];
    if (!updated[index]) return;

    // Reset beberapa kolom agar bisa diedit ulang
    updated[index].verifikasi = false;
    updated[index].status = "Menunggu";
    updated[index].komentarStaff = "";

    setDataCreative(updated);
    localStorage.setItem("creativeData", JSON.stringify(updated));

    showNotif("Data dikembalikan untuk diperbaiki", "info");
  };

  // Fungsi menambah pembina
  const handleAddPembina = (e) => {
    e.preventDefault();

    if (!formPembina.nama.trim()) {
      showNotif("Harap isi semua kolom input pembina!", "error");
      return;
    }

    const newItem = {
      nama: formPembina.nama.trim(),
      binusianId: formPembina.binusianId.trim(),
      area: formPembina.area.trim(),
      pic: formPembina.pic.trim()
    };

    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah data pembina sudah benar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, simpan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (!result.isConfirmed) return;

      const updated = [...pembinaList, newItem];
      setPembinaList(updated);
      localStorage.setItem("pembinaList", JSON.stringify(updated));
      
      setFormPembina({ nama: "", binusianId: "", area: "", pic: "" });
      showNotif("Pembina berhasil ditambahkan!", "success");
    });
  };

  // Fungsi menghapus pembina
  const handleDeletePembina = (binusianId) => {

    Swal.fire({
      title: "Hapus Pembina?",
      text: "Data pembina yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (!result.isConfirmed) return;

      const updated = pembinaList.filter((p) => p.binusianId !== binusianId);
      setPembinaList(updated);
      localStorage.setItem("pembinaList", JSON.stringify(updated));
      showNotif("Pembina dihapus!", "info");
    });
  };

  // Fungsi input atau perubahan pada data buddy
  const handleBuddyChange = (e) => {
    const { name, value } = e.target;
    setFormBuddy({ ...formBuddy, [name]: value });
  };

  // Fungsi menambah data buddy
  const handleAddBuddy = (e) => {
    e.preventDefault();
    if (!formBuddy.nim || !formBuddy.nama || !formBuddy.jurusan || !formBuddy.partnerNim || !formBuddy.roleNim) {
      showNotif("Harap isi semua kolom input buddy!", "error");
      return;
    }

    const partner = dataInputPartner.find(p => p.nim === formBuddy.partnerNim);
    const pendamping = allRolesForBuddy.find(r => r.nim === formBuddy.roleNim);

    const newBuddy = {
      nim: formBuddy.nim,
      nama: formBuddy.nama,
      jurusan: formBuddy.jurusan,

      partnerNim: formBuddy.partnerNim,
      partnerNama: partner?.nama || "-",

      pendampingNim: formBuddy.roleNim,
      pendampingNama: pendamping?.nama || "-",
      pendampingRole: pendamping?.role || "-"
    };

    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah data buddy sudah benar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, simpan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (!result.isConfirmed) return;

      const updated = [...dataBuddy, newBuddy];
      setDataBuddy(updated);
      localStorage.setItem("buddyData", JSON.stringify(updated));
      
      setFormBuddy({ nim: "", nama: "", jurusan: "", partnerNim: "", roleNim: "", roleType: "" });
    });
    showNotif("Data buddy berhasil ditambahkan!", "success");
  };

  // Fungsi menghapus data buddy
  const handleDeleteBuddy = (nim) => {

    Swal.fire({
      title: "Hapus data buddy?",
      text: "Data buddy yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (!result.isConfirmed) return;

      const updated = dataBuddy.filter((b) => b.nim !== nim);
      setDataBuddy(updated);
      localStorage.setItem("buddyData", JSON.stringify(updated));
      showNotif("Data buddy berhasil dihapus!", "info");
    });
  }; 

  const allRolesForBuddy = [
    ...dataInputCounselor.map((d) => ({
      nim: d.nim,
      nama: d.nama,
      role: "Peer Counselor"
    })),
    ...dataInputPartner.map((d) => ({
      nim: d.nim,
      nama: d.nama,
      role: "Peer Partner"
    })),
    ...dataInputCreativeTeam.map((d) => ({
      nim: d.nim,
      nama: d.nama,
      role: "Creative Team"
    })),
  ];

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [riwayat, setRiwayat] = useState([]);

  // Fungsi untuk menghapus data login student
  const handleDeleteStudent = async (index) => {
    const confirm = await Swal.fire({
      title: "Hapus akun student?",
      text: "Data yang dihapus tidak dapat dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    const updated = studentAccounts.filter((_, i) => i !== index);

    setStudentAccounts(updated);
    localStorage.setItem("studentAccounts", JSON.stringify(updated));

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Akun student berhasil dihapus",
      timer: 2000,
      showConfirmButton: false,
    });
  };
  
  // Fungsi pada input data counselor
  const handleCounselorChange = (e) => {
    const { name, value } = e.target;
    setFormCounselor({ ...formCounselor, [name]: value });
  };

  const handleAddCounselor = async (e) => {
    e.preventDefault();

    if (!formCounselor.nim || !formCounselor.nama || !formCounselor.jurusan || !formCounselor.area || !formCounselor.fakultas || !formCounselor.periode) {
      Swal.fire("Error", "Semua kolom wajib diisi", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "Tambah Data Counselor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
    });

    if (!confirm.isConfirmed) return;

    const updated = [
      ...dataInputCounselor,
      {
        ...formCounselor,
        role: "Peer Counselor",
        souvenir: false,
      }
    ];

    setDataInputCounselor(updated);
    localStorage.setItem("inputCounselor", JSON.stringify(updated));
    setFormCounselor({ nim: "", nama: "", jurusan: "" });

    Swal.fire("Berhasil", "Data counselor ditambahkan", "success");
  };

  const handleDeleteCounselor = async (nim) => {
    const confirm = await Swal.fire({
      title: "Hapus Data Counselor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    });

    if (!confirm.isConfirmed) return;

    const updated = dataInputCounselor.filter((c) => c.nim !== nim);
    setDataInputCounselor(updated);
    localStorage.setItem("inputCounselor", JSON.stringify(updated));

    Swal.fire("Dihapus", "Data counselor dihapus", "info");
  };

  // Fungsi pada input data partner
  const handlePartnerChange = (e) => {
    const { name, value } = e.target;
    setFormPartner({ ...formPartner, [name]: value });
  };

  const handleAddPartner = async (e) => {
    e.preventDefault();

    if (!formPartner.nim || !formPartner.nama || !formPartner.jurusan || !formPartner.area || !formPartner.fakultas || !formPartner.periode) {
      Swal.fire("Error", "Semua kolom wajib diisi", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "Tambah Data Partner?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
    });

    if (!confirm.isConfirmed) return;

    const updated = [
      ...dataInputPartner,
      {
        ...formPartner,
        role: "Peer Partner",
        souvenir: false,
      }
    ];

    setDataInputPartner(updated);
    localStorage.setItem("inputPartner", JSON.stringify(updated));
    setFormPartner({ nim: "", nama: "", jurusan: "" });

    Swal.fire("Berhasil", "Data partner ditambahkan", "success");
  };

  const handleDeletePartner = async (nim) => {
    const confirm = await Swal.fire({
      title: "Hapus Data Partner?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    });

    if (!confirm.isConfirmed) return;

    const updated = dataInputPartner.filter((p) => p.nim !== nim);
    setDataInputPartner(updated);
    localStorage.setItem("inputPartner", JSON.stringify(updated));

    Swal.fire("Dihapus", "Data partner dihapus", "info");
  };

  // Fungsi pada input data creative team
  const handleCreativeTeamChange = (e) => {
    const { name, value } = e.target;
    setFormCreativeTeam({ ...formCreativeTeam, [name]: value });
  };

  const handleAddCreativeTeam = async (e) => {
    e.preventDefault();

    if (!formCreativeTeam.nim || !formCreativeTeam.nama || !formCreativeTeam.jurusan || !formCreativeTeam.area || !formCreativeTeam.fakultas || !formCreativeTeam.periode) {
      Swal.fire("Error", "Semua kolom wajib diisi", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "Tambah Data Creative Team?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
    });

    if (!confirm.isConfirmed) return;

    const updated = [
      ...dataInputCreativeTeam,
      {
        ...formCreativeTeam,
        role: "Creative Team",
        souvenir: false,
      }
    ];

    setDataInputCreativeTeam(updated);
    localStorage.setItem("inputCreativeTeam", JSON.stringify(updated));
    setFormCreativeTeam({ nim: "", nama: "", jurusan: "" });

    Swal.fire("Berhasil", "Data Creative Team ditambahkan", "success");
  };

  const handleDeleteCreativeTeam = async (nim) => {
    const confirm = await Swal.fire({
      title: "Hapus Data Creative Team?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    });

    if (!confirm.isConfirmed) return;

    const updated = dataInputCreativeTeam.filter((ct) => ct.nim !== nim);
    setDataInputCreativeTeam(updated);
    localStorage.setItem("inputCreativeTeam", JSON.stringify(updated));

    Swal.fire("Dihapus", "Data Creative Team dihapus", "info");
  };

  // Sinkronisasi keseluruhan data untuk tabel (tarik data report)
  const handleTarikData = () => {
    const counselorData = JSON.parse(localStorage.getItem("counselorData")) || [];
    const partnerData = JSON.parse(localStorage.getItem("partnerData")) || [];
    const creativeData = JSON.parse(localStorage.getItem("creativeData")) || [];

    // Sinkronisasi data ke halaman SASC Staff
    const allData = [
      ...counselorData.map((d) => ({
        role: "Peer Counselor",
        periode: d.periode || "-",
        kampus: d.kampus || "-",
        nim: d.nim || "-",
        nama: d.nama || "-",
        jurusan: d.jurusan || "-",
        kampusArea: d.kampusArea || "-",
        tanggalKonseling: d.tanggalKonseling || "-",
        jamMulai: d.jamMulai || "-",
        jamSelesai: d.jamSelesai || "-",
        durasi: d.durasi || "-",
        metode: d.metode || "-",
        deskripsi: d.deskripsi || "-",
        kendala: d.kendala || "-",
        supportNeeded: d.supportNeeded || "-",
        statusCase: d.statusCase || "-",
        verifikasi: d.verifikasi ? "✅" : "❌",
        komentarStaff: d.komentarStaff || "-",
      })),
      ...partnerData.map((d) => ({
        role: "Peer Partner",
        periode: d.periode || "-",
        kampus: d.kampus || "-",
        nimBuddy: d.nimBuddy || "-",
        namaBuddy: d.namaBuddy || "-",
        jurusan: d.jurusan || "-",
        partnerNama: d.partnerNama || "-",
        pendamping:
          d.pendampingNama && d.pendampingRole
            ? `${d.pendampingNama} (${d.pendampingRole})`
            : "-",
        tanggal: d.tanggal || d.tanggalKonseling || "-",
        jamMulai: d.jamMulai || "-",
        jamSelesai: d.jamSelesai || "-",
        durasi: d.durasi || "-",
        metode: d.metode || "-",
        deskripsi: d.deskripsi || "-",
        kendala: d.kendala || "-",
        support: d.support || d.supportNeeded || "-",
        verifikasi: d.verifikasi ? "✅" : "❌",
        komentarStaff: d.komentarStaff || "-",
      })),
      ...creativeData.map((d) => ({
        role: "Creative Team",
        periode: d.periode || "-",
        pembina: d.pembina || "-",
        topik: d.topik || "-",
        // statusTopik: d.statusTopik || "-",
        tanggalDiskusi: d.tanggalDiskusi || "-",
        mediaDiskusi: d.mediaDiskusi || "-",
        hasilDiskusi: d.hasilDiskusi || "-",
        status: d.status || "-",
        linkIG: d.linkIG || "-",
        verifikasi: d.verifikasi ? "✅" : "❌",
        komentarStaff: d.komentarStaff || "-",
      })),
    ];

    // Filter riwayat atau sebelumnya (periode dan role)
    const filtered = allData.filter((d) => {
      const matchPeriode = !selectedPeriod || d.periode === selectedPeriod;
      const matchRole = !selectedRole || d.role === selectedRole;
      return matchPeriode && matchRole;
    });

    setRiwayat(filtered);

    Swal.fire({
      icon: "success",
      title: "Data berhasil ditarik!",
      showConfirmButton: false,
      timer: 5000,
      position: "center",
    });
  };

  const headerLabels = {
    partnerNama: "Partner",
  };

  // Fungsi export atau download file data dengan excel
  const handleExportSingleExcel = (item) => {
    
    // Mengubah data sebelum di-export
    const formattedItem = Object.entries(item).reduce((acc, [key, value]) => {
      if (key.toLowerCase().includes("durasi") && value) {
        acc[key] = `${value} menit`;
      }
      else if (typeof value === "boolean") {
        acc[key] = value ? "✅" : "❌";
      }
      else if (value === null || value === undefined || value === "") {
        acc[key] = "-";
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Memuat worksheet atau workbook
    const worksheet = XLSX.utils.json_to_sheet([formattedItem]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${item.nama || item.namaBuddy || item.pembina}_Data Report.xlsx`);
  };

  // Fungsi export atau download file dari keseluruhan data dengan excel
  const handleExportExcel = () => {
    if (riwayat.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Tidak ada data",
        text: "Tarik data terlebih dahulu sebelum ekspor Excel.",
      });
      return;
    }

    // Membuat worksheet dari semua data riwayat
    const worksheet = XLSX.utils.json_to_sheet(riwayat);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(
      workbook,
      `Report_${selectedRole || "Semua"}_${selectedPeriod || "All"}.xlsx`
    );
  };

  // Fungsi perubahan proses pada bagian checklist pengambilan souvenir
  const handleSouvenirChange = (item, checked) => {
    if (item.source === "counselor") {
      const updated = [...dataInputCounselor];
      updated[item.index].souvenir = checked;
      setDataInputCounselor(updated);
      localStorage.setItem("inputCounselor", JSON.stringify(updated));
    }

    if (item.source === "partner") {
      const updated = [...dataInputPartner];
      updated[item.index].souvenir = checked;
      setDataInputPartner(updated);
      localStorage.setItem("inputPartner", JSON.stringify(updated));
    }

    if (item.source === "creative") {
      const updated = [...dataInputCreativeTeam];
      updated[item.index].souvenir = checked;
      setDataInputCreativeTeam(updated);
      localStorage.setItem("inputCreativeTeam", JSON.stringify(updated));
    }

    showNotif(
      `${item.nama} (${item.role}) ${
        checked ? "✅ sudah mengambil souvenir" : "❌ belum mengambil souvenir"
      }`,
      "info"
    );
  };

  const souvenirList = [
    ...dataInputCounselor.map((d, i) => ({
      ...d,
      role: "Peer Counselor",
      source: "counselor",
      index: i,
    })),
    ...dataInputPartner.map((d, i) => ({
      ...d,
      role: "Peer Partner",
      source: "partner",
      index: i,
    })),
    ...dataInputCreativeTeam.map((d, i) => ({
      ...d,
      role: "Creative Team",
      source: "creative",
      index: i,
    })),
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Notifikasi */}
      {notif.show && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none`}
          aria-live="polite"
        >
          <div
            className={`pointer-events-auto px-6 py-4 rounded-2xl shadow-lg transform transition-all duration-300 ${
              notif.show ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } ${notif.type === "success" ? "bg-green-50" : notif.type === "error" ? "bg-red-50" : "bg-white"}`}
            style={{ minWidth: 280, maxWidth: 520 }}
          >
            <p className="text-center font-medium text-sm">
              {notif.message}
            </p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">SASC Staff</h2>
        <ul className="space-y-3 text-gray-700">
          <li
            onClick={() => setActivePage("pembina")}
            className={`cursor-pointer font-semibold ${activePage === "pembina" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Input Pembina
          </li>
          <li
            onClick={() => setActivePage("buddy")}
            className={`cursor-pointer font-semibold ${activePage === "buddy" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Input Data Buddy
          </li>
          <li
            onClick={() => setActivePage("dataloginstudent")}
            className={`cursor-pointer font-semibold ${activePage === "dataloginstudent" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Input Data Login Student
          </li>
          <li
            onClick={() => setActivePage("peer-counselor")}
            className={`cursor-pointer font-semibold ${activePage === "peer-counselor" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Input Data Counselor
          </li>
          <li
            onClick={() => setActivePage("peer-partner")}
            className={`cursor-pointer font-semibold ${activePage === "peer-partner" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Input Data Partner
          </li>
          <li
            onClick={() => setActivePage("creative-team")}
            className={`cursor-pointer font-semibold ${activePage === "creative-team" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Input Data Creative Team
          </li>
          <li
            onClick={() => setActivePage("counselor")}
            className={`cursor-pointer font-semibold ${activePage === "counselor" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Verifikasi Peer Counselor
          </li>
          <li
            onClick={() => setActivePage("partner")}
            className={`cursor-pointer font-semibold ${activePage === "partner" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Verifikasi Peer Partner
          </li>
          <li
            onClick={() => setActivePage("creative")}
            className={`cursor-pointer font-semibold ${activePage === "creative" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Verifikasi Creative Team
          </li>
          <li
            onClick={() => setActivePage("report")}
            className={`cursor-pointer font-semibold ${activePage === "report" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Tarik Data Report
          </li>
          <li
            onClick={() => setActivePage("souvenir")}
            className={`cursor-pointer font-semibold ${activePage === "souvenir" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Checklist Pengambilan Souvenir
          </li>
          <li
            onClick={() => setActivePage("evaluasi-kuesioner")}
            className={`cursor-pointer font-semibold ${activePage === "evaluasi-kuesioner" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Input Evaluasi dan Kuesioner
          </li>
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">

        {/* Topbar */}
        <div className="flex justify-end items-center mb-8 space-x-6">
          <div className="flex items-center space-x-4">
            <User className="text-gray-700" />
            <div>
              <p className="font-semibold text-gray-800">Staff SASC</p>
              <p className="text-sm text-gray-600">Administrator</p>
            </div>

            {/* Tombol logout */}
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-900 transition text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* PAGE: INPUT PEMBINA */}
        {activePage === "pembina" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Input Pembina</h1>

            <form onSubmit={handleAddPembina} className="bg-white p-6 rounded-2xl shadow mb-8">
              <div className="grid grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-sm font-semibold">Nama Pembina</label>
                  <input
                    type="text"
                    value={formPembina.nama}
                    onChange={(e) => setFormPembina({ ...formPembina, nama: e.target.value })}
                    className="border rounded-lg p-2 w-full"
                    placeholder="Masukkan nama"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Binusian ID</label>
                  <input
                    type="text"
                    value={formPembina.binusianId}
                    onChange={(e) => setFormPembina({ ...formPembina, binusianId: e.target.value })}
                    className="border rounded-lg p-2 w-full"
                    placeholder="Masukkan Binusian ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">Area Kampus</label>
                  <select
                    name="area"
                    value={formPembina.area}
                    onChange={(e) => setFormPembina({ ...formPembina, area: e.target.value })}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">-- Pilih Area Kampus --</option>
                    <option value="Kemanggisan">Kemanggisan</option>
                    <option value="Alam Sutera">Alam Sutera</option>
                    <option value="Bekasi">Bekasi</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Malang">Malang</option>
                    <option value="Semarang">Semarang</option>
                    <option value="Medan">Medan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold">PIC</label>
                  <input
                    type="text"
                    value={formPembina.pic}
                    onChange={(e) => setFormPembina({ ...formPembina, pic: e.target.value })}
                    className="border rounded-lg p-2 w-full"
                    placeholder="Masukkan PIC"
                  />
                </div>

              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Tambah Pembina
                </button>
              </div>
            </form>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Pembina</h2>
              
              {/* Fitur pencarian */}
              <input
                type="text"
                value={searchPembina}
                onChange={(e) => setSearchPembina(e.target.value)}
                placeholder="Cari nama pembina..."
                className="border rounded-lg p-2 w-64 mb-4"
              />

              {pembinaList.length === 0 ? (
                <p className="text-gray-500">Belum ada pembina yang ditambahkan.</p>
              ) : (

                <div className="max-h-96 overflow-y-auto rounded-lg border">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-gray-200 sticky top-0">
                      <tr className="border-b">
                        <th className="p-2">Binusian ID</th>
                        <th className="p-2">Nama</th>
                        <th className="p-2">Area Kampus</th>
                        <th className="p-2">PIC</th>
                        <th className="p-2">Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {pembinaList
                        .filter((p) =>
                          searchPembina === "" ||
                          p.nama?.toLowerCase().includes(searchPembina.toLowerCase())
                        )
                        .map((p, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2">{p.binusianId}</td>
                            <td className="p-2">{p.nama}</td>
                            <td className="p-2">{p.area}</td>
                            <td className="p-2">{p.pic}</td>
                            <td className="p-2">
                              <button
                                onClick={() => handleDeletePembina(p.binusianId)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* PAGE: INPUT DATA BUDDY */}
        {activePage === "buddy" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Input Data Buddy</h1>
            <form onSubmit={handleAddBuddy} className="bg-white p-6 rounded-2xl shadow mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">NIM</label>
                  <input type="text" name="nim" value={formBuddy.nim} onChange={handleBuddyChange} className="border rounded-lg p-2 w-full" placeholder="Masukkan NIM" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
                  <input type="text" name="nama" value={formBuddy.nama} onChange={handleBuddyChange} className="border rounded-lg p-2 w-full" placeholder="Masukkan Nama" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Jurusan</label>
                  <input type="text" name="jurusan" value={formBuddy.jurusan} onChange={handleBuddyChange} className="border rounded-lg p-2 w-full" placeholder="Masukkan Jurusan" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Pilih Partner
                  </label>
                  <select
                    name="partnerNim"
                    value={formBuddy.partnerNim}
                    onChange={handleBuddyChange}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">-- Pilih Partner --</option>
                    {dataInputPartner.map((p, i) => (
                      <option key={i} value={p.nim}>
                        {p.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Pilih Peran Pendamping
                  </label>
                  <select
                    value={formBuddy.roleNim}
                    onChange={(e) => {
                      const selected = allRolesForBuddy.find(
                        (r) => r.nim === e.target.value
                      );

                      setFormBuddy({
                        ...formBuddy,
                        roleNim: e.target.value,
                        roleType: selected?.role || ""
                      });
                    }}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">-- Pilih Counselor / Partner / Creative Team --</option>
                    {allRolesForBuddy.map((r, i) => (
                      <option key={i} value={r.nim}>
                        {r.nama} ({r.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button type="submit" className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Tambah Buddy
                </button>
              </div>
            </form>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Buddy</h2>
              
              {/* Fitur pencarian */}
              <input
                type="text"
                value={searchBuddy}
                onChange={(e) => setSearchBuddy(e.target.value)}
                placeholder="Cari nama buddy..."
                className="border rounded-lg p-2 w-64 mb-4"
              />
              
              {dataBuddy.length === 0 ? (
                <p className="text-gray-500">Belum ada data buddy.</p>
              ) : (

              <div className="max-h-96 overflow-y-auto rounded-lg border">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-gray-200 sticky top-0">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-center">NIM</th>
                      <th className="py-2 px-3 text-center">Nama</th>
                      <th className="py-2 px-3 text-center">Jurusan</th>
                      <th className="py-2 px-3 text-center">Partner</th>
                      <th className="py-2 px-3 text-center">Pendamping</th>
                      <th className="py-2 px-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataBuddy
                      .filter((b) =>
                        searchBuddy === "" ||
                        b.nama?.toLowerCase().includes(searchBuddy.toLowerCase())
                      )
                      .map((b, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{b.nim}</td>
                        <td className="py-2 px-3 text-center">{b.nama}</td>
                        <td className="py-2 px-3 text-center">{b.jurusan}</td>
                        <td className="py-2 px-3 text-center">
                          {b.partnerNama || "-"}
                        </td>

                        <td className="py-2 px-3 text-center">
                          {b.pendampingNama || "-"} ({b.pendampingRole || "-"})
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => handleDeleteBuddy(b.nim)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </>
        )}

        {/* PAGE: INPUT DATA LOGIN STUDENT */}
        {activePage === "dataloginstudent" && (
          <>
            <h1 className="text-2xl font-bold mb-6">
              Input Data Login Student
            </h1>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (
                  !formStudentLogin.username ||
                  !formStudentLogin.password ||
                  !formStudentLogin.nim ||
                  !formStudentLogin.nama
                ) {
                  Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Semua kolom wajib diisi",
                  });
                  return;
                }

                // 🔔 NOTIFIKASI INFORMASI
                const confirm = await Swal.fire({
                  icon: "info",
                  title: "Informasi Akun Student",
                  html: `
                    <p>Akun ini akan digunakan oleh <b>student</b> untuk login.</p>
                    <p>Pastikan <b>username dan password</b> sudah benar.</p>
                  `,
                  showCancelButton: true,
                  confirmButtonText: "Simpan Akun",
                  cancelButtonText: "Batal",
                });

                if (!confirm.isConfirmed) return;

                const updated = [...studentAccounts, formStudentLogin];
                setStudentAccounts(updated);
                localStorage.setItem("studentAccounts", JSON.stringify(updated));

                setFormStudentLogin({
                  username: "",
                  password: "",
                  nim: "",
                  nama: "",
                });

                Swal.fire({
                  icon: "success",
                  title: "Berhasil",
                  text: "Akun student berhasil ditambahkan",
                  timer: 2000,
                  showConfirmButton: false,
                });
              }}
              className="bg-white p-6 rounded-2xl shadow mb-8"
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Username"
                  value={formStudentLogin.username}
                  onChange={(e) =>
                    setFormStudentLogin({
                      ...formStudentLogin,
                      username: e.target.value
                    })
                  }
                  className="border p-2 rounded-lg"
                />
                <input
                  placeholder="Password"
                  value={formStudentLogin.password}
                  onChange={(e) =>
                    setFormStudentLogin({
                      ...formStudentLogin,
                      password: e.target.value
                    })
                  }
                  className="border p-2 rounded-lg"
                />
                <input
                  placeholder="NIM"
                  value={formStudentLogin.nim}
                  onChange={(e) =>
                    setFormStudentLogin({
                      ...formStudentLogin,
                      nim: e.target.value
                    })
                  }
                  className="border p-2 rounded-lg"
                />
                <input
                  placeholder="Nama Student"
                  value={formStudentLogin.nama}
                  onChange={(e) =>
                    setFormStudentLogin({
                      ...formStudentLogin,
                      nama: e.target.value
                    })
                  }
                  className="border p-2 rounded-lg"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
                  Simpan Akun
                </button>
              </div>
            </form>

            {/* TABEL AKUN */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4">
                Daftar Akun Student
              </h2>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama student"
                  value={searchNamaStudent}
                  onChange={(e) => setSearchNamaStudent(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>

              <div className="max-h-96 overflow-y-auto rounded-lg border">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-gray-200 sticky top-0">
                  <tr className="border-b">
                    <th className="py-2 px-3 text-center">Username</th>
                    <th className="py-2 px-3 text-center">Password</th>
                    <th className="py-2 px-3 text-center">NIM</th>
                    <th className="py-2 px-3 text-center">Nama</th>
                    <th className="py-2 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {studentAccounts
                    .filter((s) =>
                      searchNamaStudent === "" ||
                      s.nama?.toLowerCase().includes(searchNamaStudent.toLowerCase())
                    )
                    .map((s, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-3 text-center">{s.username}</td>
                      <td className="py-2 px-3 text-center">{s.password}</td>
                      <td className="py-2 px-3 text-center">{s.nim}</td>
                      <td className="py-2 px-3 text-center">{s.nama}</td>
                      <td className="p-2 px-3 text-center">
                        <button
                          onClick={() => handleDeleteStudent(i)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PAGE: INPUT DATA COUNSELOR */}
        {activePage === "peer-counselor" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Input Data Counselor</h1>

            <form onSubmit={handleAddCounselor} className="bg-white p-6 rounded-2xl shadow mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="nim" value={formCounselor.nim} onChange={handleCounselorChange}
                  className="border p-2 rounded-lg" placeholder="Masukkan NIM" />
                <input name="nama" value={formCounselor.nama} onChange={handleCounselorChange}
                  className="border p-2 rounded-lg" placeholder="Masukkan Nama" />
                <input name="jurusan" value={formCounselor.jurusan} onChange={handleCounselorChange}
                  className="border p-2 rounded-lg" placeholder="Masukkan Jurusan" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 mt-4">Area Kampus</label>
                <select
                  name="area"
                  value={formCounselor.area}
                  onChange={handleCounselorChange}
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="">-- Pilih Area Kampus --</option>
                  <option value="Kemanggisan">Kemanggisan</option>
                  <option value="Alam Sutera">Alam Sutera</option>
                  <option value="Bekasi">Bekasi</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Malang">Malang</option>
                  <option value="Semarang">Semarang</option>
                  <option value="Medan">Medan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 mt-4">Fakultas</label>
                <select
                  name="fakultas"
                  value={formCounselor.fakultas}
                  onChange={handleCounselorChange}
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="">-- Pilih Fakultas --</option>
                  <option value="School of Computer Science">School of Computer Science</option>
                  <option value="School of Information System">School of Information System</option>
                  <option value="Faculty of Humanities">Faculty of Humanities</option>
                  <option value="School of Design">School of Design</option>
                  <option value="Business School">Business School</option>
                  <option value="Faculty Engineering">Faculty Engineering</option>
                  <option value="Faculty of Economics & Communication">
                    Faculty of Economics & Communication
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 mt-4">Periode</label>
                <input
                  type="number"
                  name="periode"
                  value={formCounselor.periode}
                  onChange={handleCounselorChange}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Contoh: 2025"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
                  Tambah Counselor
                </button>
              </div>
            </form>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Data Counselor</h2>
              
              <input
                value={searchCounselor}
                onChange={(e) => setSearchCounselor(e.target.value)}
                placeholder="Cari nama counselor..."
                className="border p-2 rounded-lg mb-4"
              />

              <div className="max-h-56 overflow-y-auto rounded-lg border">
                <table className="min-w-full text-left text-sm">
                   <thead className="bg-gray-200 sticky top-0">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-center">NIM</th>
                      <th className="py-2 px-3 text-center">Nama</th>
                      <th className="py-2 px-3 text-center">Jurusan</th>
                      <th className="py-2 px-3 text-center">Area Kampus</th>
                      <th className="py-2 px-3 text-center">Fakultas</th>
                      <th className="py-2 px-3 text-center">Periode</th>
                      <th className="py-2 px-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataInputCounselor
                      .filter((c) =>
                        (c.nama || "").toLowerCase().includes(searchCounselor.toLowerCase())
                      )
                      .map((c, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3 text-center">{c.nim}</td>
                          <td className="py-2 px-3 text-center">{c.nama}</td>
                          <td className="py-2 px-3 text-center">{c.jurusan}</td>
                          <td className="py-2 px-3 text-center">{c.area}</td>
                          <td className="py-2 px-3 text-center">{c.fakultas}</td>
                          <td className="py-2 px-3 text-center">{c.periode}</td>
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => handleDeleteCounselor(c.nim)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PAGE: INPUT DATA PARTNER */}
        {activePage === "peer-partner" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Input Data Partner</h1>

            <form onSubmit={handleAddPartner} className="bg-white p-6 rounded-2xl shadow mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="nim" value={formPartner.nim} onChange={handlePartnerChange}
                  className="border p-2 rounded-lg" placeholder="Masukkan NIM" />
                <input name="nama" value={formPartner.nama} onChange={handlePartnerChange}
                  className="border p-2 rounded-lg" placeholder="Masukkan Nama" />
                <input name="jurusan" value={formPartner.jurusan} onChange={handlePartnerChange}
                  className="border p-2 rounded-lg" placeholder="Masukkan Jurusan" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 mt-4">Area Kampus</label>
                <select
                  name="area"
                  value={formPartner.area}
                  onChange={handlePartnerChange}
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="">-- Pilih Area Kampus --</option>
                  <option value="Kemanggisan">Kemanggisan</option>
                  <option value="Alam Sutera">Alam Sutera</option>
                  <option value="Bekasi">Bekasi</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Malang">Malang</option>
                  <option value="Semarang">Semarang</option>
                  <option value="Medan">Medan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 mt-4">Fakultas</label>
                <select
                  name="fakultas"
                  value={formPartner.fakultas}
                  onChange={handlePartnerChange}
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="">-- Pilih Fakultas --</option>
                  <option value="School of Computer Science">School of Computer Science</option>
                  <option value="School of Information System">School of Information System</option>
                  <option value="Faculty of Humanities">Faculty of Humanities</option>
                  <option value="School of Design">School of Design</option>
                  <option value="Business School">Business School</option>
                  <option value="Faculty Engineering">Faculty Engineering</option>
                  <option value="Faculty of Economics & Communication">
                    Faculty of Economics & Communication
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 mt-4">Periode</label>
                <input
                  type="number"
                  name="periode"
                  value={formPartner.periode}
                  onChange={handlePartnerChange}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Contoh: 2025"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
                  Tambah Partner
                </button>
              </div>
            </form>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Data Partner</h2>
              
              <input
                value={searchPartner}
                onChange={(e) => setSearchPartner(e.target.value)}
                placeholder="Cari nama partner..."
                className="border p-2 rounded-lg mb-4"
              />

              <div className="max-h-56 overflow-y-auto rounded-lg border">
                <table className="min-w-full text-left text-sm">
                   <thead className="bg-gray-200 sticky top-0">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-center">NIM</th>
                      <th className="py-2 px-3 text-center">Nama</th>
                      <th className="py-2 px-3 text-center">Jurusan</th>
                      <th className="py-2 px-3 text-center">Area Kampus</th>
                      <th className="py-2 px-3 text-center">Fakultas</th>
                      <th className="py-2 px-3 text-center">Periode</th>
                      <th className="py-2 px-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataInputPartner
                      .filter((p) =>
                        (p.nama || "").toLowerCase().includes(searchPartner.toLowerCase())
                      )
                      .map((p, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3 text-center">{p.nim}</td>
                          <td className="py-2 px-3 text-center">{p.nama}</td>
                          <td className="py-2 px-3 text-center">{p.jurusan}</td>
                          <td className="py-2 px-3 text-center">{p.area}</td>
                          <td className="py-2 px-3 text-center">{p.fakultas}</td>
                          <td className="py-2 px-3 text-center">{p.periode}</td>
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => handleDeletePartner(p.nim)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PAGE: INPUT DATA CREATIVE TEAM */}
        {activePage === "creative-team" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Input Data Creative Team</h1>

            <form onSubmit={handleAddCreativeTeam} className="bg-white p-6 rounded-2xl shadow mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="nim" value={formCreativeTeam.nim} onChange={handleCreativeTeamChange}
                  className="border p-2 rounded-lg" placeholder="Masukkan NIM" />
                <input name="nama" value={formCreativeTeam.nama} onChange={handleCreativeTeamChange}
                  className="border p-2 rounded-lg" placeholder="Masukkan Nama" />
                <input name="jurusan" value={formCreativeTeam.jurusan} onChange={handleCreativeTeamChange}
                  className="border p-2 rounded-lg" placeholder="Masukkan Jurusan" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 mt-4">Area Kampus</label>
                <select
                  name="area"
                  value={formCreativeTeam.area}
                  onChange={handleCreativeTeamChange}
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="">-- Pilih Area Kampus --</option>
                  <option value="Kemanggisan">Kemanggisan</option>
                  <option value="Alam Sutera">Alam Sutera</option>
                  <option value="Bekasi">Bekasi</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Malang">Malang</option>
                  <option value="Semarang">Semarang</option>
                  <option value="Medan">Medan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 mt-4">Fakultas</label>
                <select
                  name="fakultas"
                  value={formCreativeTeam.fakultas}
                  onChange={handleCreativeTeamChange}
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="">-- Pilih Fakultas --</option>
                  <option value="School of Computer Science">School of Computer Science</option>
                  <option value="School of Information System">School of Information System</option>
                  <option value="Faculty of Humanities">Faculty of Humanities</option>
                  <option value="School of Design">School of Design</option>
                  <option value="Business School">Business School</option>
                  <option value="Faculty Engineering">Faculty Engineering</option>
                  <option value="Faculty of Economics & Communication">
                    Faculty of Economics & Communication
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 mt-4">Periode</label>
                <input
                  type="number"
                  name="periode"
                  value={formCreativeTeam.periode}
                  onChange={handleCreativeTeamChange}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Contoh: 2025"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
                  Tambah Creative Team
                </button>
              </div>
            </form>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Data Creative Team</h2>
              
              <input
                value={searchCreativeTeam}
                onChange={(e) => setSearchCreativeTeam(e.target.value)}
                placeholder="Cari nama creative team..."
                className="border p-2 rounded-lg mb-4"
              />

              <div className="max-h-56 overflow-y-auto rounded-lg border">
                <table className="min-w-full text-left text-sm">
                   <thead className="bg-gray-200 sticky top-0">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-center">NIM</th>
                      <th className="py-2 px-3 text-center">Nama</th>
                      <th className="py-2 px-3 text-center">Jurusan</th>
                      <th className="py-2 px-3 text-center">Area Kampus</th>
                      <th className="py-2 px-3 text-center">Fakultas</th>
                      <th className="py-2 px-3 text-center">Periode</th>
                      <th className="py-2 px-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataInputCreativeTeam
                      .filter((ct) =>
                        (ct.nama || "").toLowerCase().includes(searchCreativeTeam.toLowerCase())
                      )
                      .map((ct, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3 text-center">{ct.nim}</td>
                          <td className="py-2 px-3 text-center">{ct.nama}</td>
                          <td className="py-2 px-3 text-center">{ct.jurusan}</td>
                          <td className="py-2 px-3 text-center">{ct.area}</td>
                          <td className="py-2 px-3 text-center">{ct.fakultas}</td>
                          <td className="py-2 px-3 text-center">{ct.periode}</td>
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => handleDeleteCreativeTeam(ct.nim)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PAGE: VERIFIKASI PEER COUNSELOR */}
        {activePage === "counselor" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Verifikasi Peer Counselor</h1>
            <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
              
              {/* Fitur search periode */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Cari berdasarkan periode (contoh: 2023, 2024, atau 2025...)"
                  className="border rounded-lg p-2 w-full md:w-1/3"
                  value={searchPeriode}
                  onChange={(e) => setSearchPeriode(e.target.value)}
                />
              </div>
              {dataCounselor.length === 0 ? (
                <p className="text-gray-500">Belum ada data peer counselor.</p>
              ) : (
                <div className="max-h-[750px] overflow-y-auto rounded-lg border">
                <table className="min-w-full text-sm text-left border-collapse table-fixed w-full">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-center">Periode</th>
                      <th className="py-2 px-3 text-center">Kampus</th>
                      <th className="py-2 px-3 text-center">NIM</th>
                      <th className="py-2 px-3 text-center">Nama</th>
                      <th className="py-2 px-3 text-center">Jurusan</th>
                      <th className="py-2 px-3 text-center">Area Kampus Mahasiswa</th>
                      <th className="py-2 px-3 text-center">Tanggal Konseling</th>
                      <th className="py-2 px-3 text-center">Jam Mulai</th>
                      <th className="py-2 px-3 text-center">Jam Selesai</th>
                      <th className="py-2 px-3 text-center">Durasi</th>
                      <th className="py-2 px-3 text-center">Metode</th>
                      <th className="py-2 px-3 text-center">Deskripsi Kegiatan</th>
                      <th className="py-2 px-3 text-center">Kendala Konseling</th>
                      <th className="py-2 px-3 text-center">Support Needed</th>
                      <th className="py-2 px-3 text-center">Status Case</th>
                      <th className="py-2 px-3 text-center">Verifikasi</th>
                      <th className="py-2 px-3 text-center">Komentar Staff</th>
                      <th className="py-2 px-3 text-center">Status Proses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCounselor
                      .map((item, originalIndex) => ({ ...item, originalIndex }))
                      .filter((item) =>
                        item.periode?.toLowerCase().includes(searchPeriode.toLowerCase())
                      )
                      .map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{item.periode || "-"}</td>
                        <td className="py-2 px-3 text-center">{item.kampus || "-"}</td>
                        <td className="py-2 px-3 text-center">{item.nim}</td>
                        <td className="py-2 px-3 text-center">{item.nama}</td>
                        <td className="py-2 px-3 text-center">{item.jurusan}</td>
                        <td className="py-2 px-3 text-center">{item.kampusArea}</td>
                        <td className="py-2 px-3 text-center">{item.tanggalKonseling}</td>
                        <td className="py-2 px-3 text-center">{item.jamMulai}</td>
                        <td className="py-2 px-3 text-center">{item.jamSelesai}</td>
                        <td className="py-2 px-3 text-center">{item.durasi} menit</td>
                        <td className="py-2 px-3 text-center capitalize">{item.metode}</td>
                        <td className="py-2 px-3 text-center">{item.deskripsi}</td>
                        <td className="py-2 px-3 text-center">{item.kendala}</td>
                        <td className="py-2 px-3 text-center">{item.supportNeeded}</td>
                        <td className="py-2 px-3 text-center">{item.statusCase}</td>
                        <td className="py-2 px-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => updateVerifikasiCounselor(item.originalIndex, "setuju")}
                              className="text-green-600 text-xl transition-transform transform hover:scale-125 hover:rotate-12 cursor-pointer"
                              title="Setujui"
                            >
                              ✔️
                            </button>
                            <button
                              onClick={() => updateVerifikasiCounselor(item.originalIndex, "tidak")}
                              className="text-red-600 text-xl transition-transform transform hover:scale-125 hover:-rotate-12 cursor-pointer"
                              title="Tidak Disetujui"
                            >
                              ❌
                            </button>
                            <button
                              onClick={() => updateVerifikasiCounselor(item.originalIndex, "decline")}
                              className="text-orange-500 text-xl transition-transform transform hover:scale-125 hover:rotate-12 cursor-pointer"
                              title="Decline (Edit Ulang)"
                            >
                              🔁
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          {item.status === "Decline (Edit Ulang)" ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={item.komentarStaff || ""}
                                onChange={(e) => handleKomentarCounselor(item.originalIndex, e.target.value)}
                                className="border rounded-lg p-2 w-full"
                                placeholder="Komentar revisi..."
                              />
                              <button
                                onClick={() => handleEditUlangCounselor(item.originalIndex)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition text-sm"
                              >
                                Kirim Ulang
                              </button>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={item.komentarStaff || ""}
                              onChange={(e) => handleKomentarCounselor(item.originalIndex, e.target.value)}
                              className="border rounded-lg p-2 w-full"
                              placeholder="Tulis komentar..."
                            />
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {item.status === "Disetujui" && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Disetujui
                            </span>
                          )}
                          {item.status === "Tidak Disetujui" && (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Tidak Disetujui
                            </span>
                          )}
                          {item.status === "Decline" && (
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Revisi
                            </span>
                          )}
                          {(item.status === undefined || item.status === "Menunggu") && (
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Menunggu
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </>
        )}

        {/* PAGE: VERIFIKASI PEER PARTNER */}
        {activePage === "partner" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Verifikasi Peer Partner</h1>
            <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
              
              {/* Fitur search periode */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Cari berdasarkan periode (contoh: 2023, 2024, atau 2025...)"
                  className="border rounded-lg p-2 w-full md:w-1/3"
                  value={searchPeriode}
                  onChange={(e) => setSearchPeriode(e.target.value)}
                />
              </div>
              {dataPartner.length === 0 ? (
                <p className="text-gray-500">Belum ada data peer partner.</p>
              ) : (
                <div className="max-h-[750px] overflow-y-auto rounded-lg border">
                <table className="min-w-full text-sm text-left border-collapse table-fixed w-full">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-center">Periode</th>
                      <th className="py-2 px-3 text-center">Kampus</th>
                      <th className="py-2 px-3 text-center">Nama</th>
                      <th className="py-2 px-3 text-center">Partner dan Pendamping</th>
                      <th className="py-2 px-3 text-center">Tanggal Konseling</th>
                      <th className="py-2 px-3 text-center">Jam Mulai</th>
                      <th className="py-2 px-3 text-center">Jam Selesai</th>
                      <th className="py-2 px-3 text-center">Durasi</th>
                      <th className="py-2 px-3 text-center">Metode</th>
                      <th className="py-2 px-3 text-center">Deskripsi Kegiatan</th>
                      <th className="py-2 px-3 text-center">Kendala Konseling</th>
                      <th className="py-2 px-3 text-center">Support Needed</th>
                      <th className="py-2 px-3 text-center">Verifikasi</th>
                      <th className="py-2 px-3 text-center">Komentar Staff</th>
                      <th className="py-2 px-3 text-center">Status Proses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPartner
                      .map((item, originalIndex) => ({ ...item, originalIndex }))
                      .filter((item) =>
                        item.periode?.toLowerCase().includes(searchPeriode.toLowerCase())
                      )
                      .map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{item.periode || "-"}</td>
                        <td className="py-2 px-3 text-center">{item.kampus || "-"}</td>
                        <td className="py-2 px-3 text-center">{item.nama || item.namaBuddy}</td>
                        <td className="py-2 px-3 text-center">
                          {item.partnerNama} - {item.pendampingNama} ({item.pendampingRole})
                        </td>
                        <td className="py-2 px-3 text-center">
                          {item.tanggalKonseling || item.tanggal}
                        </td>
                        <td className="py-2 px-3 text-center">{item.jamMulai}</td>
                        <td className="py-2 px-3 text-center">{item.jamSelesai}</td>
                        <td className="py-2 px-3 text-center">{item.durasi} menit</td>
                        <td className="py-2 px-3 text-center capitalize">{item.metode}</td>
                        <td className="py-2 px-3 text-center">{item.deskripsi}</td>
                        <td className="py-2 px-3 text-center">{item.kendala}</td>
                        <td className="py-2 px-3 text-center">
                          {item.supportNeeded || item.support}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => updateVerifikasiPartner(item.originalIndex, "setuju")}
                              className="text-green-600 text-xl transition-transform transform hover:scale-125 hover:rotate-12 cursor-pointer"
                            >
                              ✔️
                            </button>
                            <button
                              onClick={() => updateVerifikasiPartner(item.originalIndex, "tidak")}
                              className="text-red-600 text-xl transition-transform transform hover:scale-125 hover:-rotate-12 cursor-pointer"
                            >
                              ❌
                            </button>
                            <button
                              onClick={() => updateVerifikasiPartner(item.originalIndex, "decline")}
                              className="text-yellow-500 text-xl transition-transform transform hover:scale-125 cursor-pointer"
                              title="Minta revisi (Decline)"
                            >
                              🔁
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          {item.status === "Decline (Edit Ulang)" ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={item.komentarStaff || ""}
                                onChange={(e) => handleKomentarPartner(item.originalIndex, e.target.value)}
                                className="border rounded-lg p-2 w-full"
                                placeholder="Komentar revisi..."
                              />
                              <button
                                onClick={() => handleEditUlangPartner(item.originalIndex)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition text-sm"
                              >
                                Kirim Ulang
                              </button>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={item.komentarStaff || ""}
                              onChange={(e) => handleKomentarPartner(item.originalIndex, e.target.value)}
                              className="border rounded-lg p-2 w-full"
                              placeholder="Tulis komentar..."
                            />
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {item.status === "Disetujui" && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Disetujui
                            </span>
                          )}
                          {item.status === "Tidak Disetujui" && (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Tidak Disetujui
                            </span>
                          )}
                          {item.status === "Decline" && (
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Revisi
                            </span>
                          )}
                          {(item.status === undefined || item.status === "Menunggu") && (
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Menunggu
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </>
        )}

        {/* PAGE: VERIFIKASI CREATIVE TEAM */}
        {activePage === "creative" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Verifikasi Creative team</h1>
            <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
              
              {/* Fitur search periode */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Cari berdasarkan periode (contoh: 2023, 2024, atau 2025...)"
                  className="border rounded-lg p-2 w-full md:w-1/3"
                  value={searchPeriode}
                  onChange={(e) => setSearchPeriode(e.target.value)}
                />
              </div>
              {dataCreative.length === 0 ? (
                <p className="text-gray-500">Belum ada data Creative Team.</p>
              ) : (
                <div className="max-h-[750px] overflow-y-auto rounded-lg border">
                <table className="min-w-full text-sm text-left border-collapse table-fixed w-full">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-center">Periode</th>
                      <th className="py-2 px-3 text-center">Pembina</th>
                      <th className="py-2 px-3 text-center">Topik</th>
                      {/* <th className="py-2 px-3 text-center">Status Topik</th> */}
                      <th className="py-2 px-3 text-center">Tanggal Diskusi</th>
                      <th className="py-2 px-3 text-center">Media Diskusi</th>
                      <th className="py-2 px-3 text-center">Hasil Diskusi</th>
                      <th className="py-2 px-3 text-center">Status Proses</th>
                      <th className="py-2 px-3 text-center">Hasil Upload Link</th>
                      <th className="py-2 px-3 text-center">Verifikasi</th>
                      <th className="py-2 px-3 text-center">Komentar Staff</th>
                      <th className="py-2 px-3 text-center">Status Proses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCreative
                      .map((item, originalIndex) => ({ ...item, originalIndex }))
                      .filter((item) =>
                        item.periode?.toLowerCase().includes(searchPeriode.toLowerCase())
                      )
                      .map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{item.periode || "-"}</td>
                        <td className="py-2 px-3 text-center">{item.pembina || "-"}</td>
                        <td className="py-2 px-3 text-center">{item.topik}</td>
                        {/* <td className="py-2 px-3 text-center">{item.statusTopik}</td> */}
                        <td className="py-2 px-3 text-center">{item.tanggalDiskusi}</td>
                        <td className="py-2 px-3 text-center">{item.mediaDiskusi}</td>
                        <td className="py-2 px-3 text-center">{item.hasilDiskusi}</td>
                        <td className="py-2 px-3 text-center">{item.status}</td>
                        <td className="py-2 px-3 text-center">
                          {item.linkIG ? (
                            <a
                              href={item.linkIG}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline break-words"
                            >
                              {item.linkIG}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => updateVerifikasiCreative(item.originalIndex, "setuju")}
                              className="text-green-600 text-xl transition-transform transform hover:scale-125 hover:rotate-12 cursor-pointer"
                            >
                              ✔️
                            </button>
                            <button
                              onClick={() => updateVerifikasiCreative(item.originalIndex, "tidak")}
                              className="text-red-600 text-xl transition-transform transform hover:scale-125 hover:-rotate-12 cursor-pointer"
                            >
                              ❌
                            </button>
                            <button
                              onClick={() => updateVerifikasiCreative(item.originalIndex, "decline")}
                              className="text-orange-600 text-xl transition-transform transform hover:scale-125 cursor-pointer"
                            >
                              🔁
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          {item.status === "Decline (Edit Ulang)" ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={item.komentarStaff || ""}
                                onChange={(e) => handleKomentarCreative(item.originalIndex, e.target.value)}
                                className="border rounded-lg p-2 w-full"
                                placeholder="Komentar revisi..."
                              />
                              <button
                                onClick={() => handleEditUlangCreative(item.originalIndex)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition text-sm"
                              >
                                Kirim Ulang
                              </button>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={item.komentarStaff || ""}
                              onChange={(e) => handleKomentarCreative(item.originalIndex, e.target.value)}
                              className="border rounded-lg p-2 w-full"
                              placeholder="Tulis komentar..."
                            />
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {item.statusVerifikasi === "Disetujui" && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Disetujui
                            </span>
                          )}
                          {item.statusVerifikasi === "Tidak Disetujui" && (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Tidak Disetujui
                            </span>
                          )}
                          {item.statusVerifikasi === "Decline (Edit Ulang)" && (
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Revisi
                            </span>
                          )}
                          {(item.statusVerifikasi === undefined || item.statusVerifikasi === "Menunggu") && (
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Menunggu
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </>
        )}

        {/* PAGE: TARIK DATA REPORT */}
        {activePage === "report" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Tarik Data Report</h1>
            <div className="bg-white p-6 rounded-2xl shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Pilih Peran</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">-- Pilih Peran --</option>
                    <option value="Peer Counselor">Peer Counselor</option>
                    <option value="Peer Partner">Peer Partner</option>
                    <option value="Creative Team">Creative Team</option>
                  </select>
                </div>
              <div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Isi Periode</label>
                  <input
                    type="text"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    placeholder="Contoh: 2023, 2024, atau 2025..."
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
              </div>
            </div>

              <button
                onClick={handleTarikData}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Tarik Data
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Hasil Data</h2>
              {riwayat.length === 0 ? (
                <p className="text-gray-500">Belum ada data yang sesuai.</p>
              ) : (
                <div className="max-h-[550px] overflow-y-auto rounded-lg border">
                <table className="min-w-full text-sm text-left border-collapse table-fixed w-full">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr className="border-b">
                      {columnsByRole[selectedRole]?.map((key) => (
                        <th
                          key={key}
                          className={`py-3 px-4 text-center font-semibold text-gray-900 border-b border-gray-200 ${
                            key === "linkIG" ? "w-48" : ""
                          }`}
                        >
                          {headerLabels[key]
                            ? headerLabels[key]
                            : key === "linkIG"
                            ? "Link Name"
                            : key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </th>
                      ))}
                      <th className="py-2 px-3 text-gray-700 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riwayat.map((item, i) => (
                      <tr key={i} className={`border-b ${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                        {columnsByRole[selectedRole]?.map((key, j) => (
                          <td
                            key={j}
                            className={`py-2 px-4 text-center border-b border-gray-100 ${
                              key === "linkIG" ? "break-words" : ""
                            }`}
                          >
                            {typeof item[key] === "boolean"
                              ? item[key]
                                ? "✅"
                                : "❌"
                              : key.toLowerCase().includes("durasi") && item[key]
                              ? `${item[key]} menit`
                              : item[key] && item[key].toString().trim() !== ""
                              ? item[key].toString()
                              : "-"}
                          </td>
                        ))}
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => handleExportSingleExcel(item)}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition text-sm"
                          >
                            Export Excel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </>
        )}

        {/* PAGE: CHECKLIST PENGAMBILAN SOUVENIR */}
        {activePage === "souvenir" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Checklist Pengambilan Souvenir</h1>
            
            <div className="bg-white p-6 rounded-2xl shadow"> 
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Daftar Data Checklist Souvenir Diterima</h1>

            {/* Search filter */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Search Periode */}
                <input
                  type="text"
                  placeholder="Cari Periode (contoh: 2025)"
                  className="border rounded-lg p-2 w-full"
                  value={searchSouvenirPeriode}
                  onChange={(e) => setSearchSouvenirPeriode(e.target.value)}
                />

                {/* Search NIM */}
                <input
                  type="text"
                  placeholder="Cari NIM"
                  className="border rounded-lg p-2 w-full"
                  value={searchSouvenirNim}
                  onChange={(e) => setSearchSouvenirNim(e.target.value)}
                />

                {/* Search Area Kampus */}
                <input
                  type="text"
                  placeholder="Cari Area Kampus (Kemanggisan, Alam Sutera, dll)"
                  className="border rounded-lg p-2 w-full"
                  value={searchSouvenirArea}
                  onChange={(e) => setSearchSouvenirArea(e.target.value)}
                />
              </div>

              {dataCounselor.length === 0 && dataPartner.length === 0 && dataCreative.length === 0 ? (
                <p className="text-gray-500">Belum ada data mahasiswa untuk pendataan souvenir.</p>
              ) : (
                <div className="max-h-[550px] overflow-y-auto rounded-lg border">
                <table className="min-w-full text-left text-sm text-left border-collapse table-fixed w-full">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-center">NIM</th>
                      <th className="py-2 px-3 text-center">Nama</th>
                      <th className="py-2 px-3 text-center">Jurusan</th>
                      <th className="py-2 px-3 text-center">Peran</th>
                      <th className="py-2 px-3 text-center">Area Kampus</th>
                      <th className="py-2 px-3 text-center">Fakultas</th>
                      <th className="py-2 px-3 text-center">Periode</th>
                      <th className="py-2 px-3 text-center">Souvenir Telah Diterima</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {souvenirList
                      .filter((item) => {
                        const periodeMatch =
                          searchSouvenirPeriode === "" ||
                          item.periode?.toString().includes(searchSouvenirPeriode);

                        const nimMatch =
                          searchSouvenirNim === "" ||
                          item.nim?.toLowerCase().includes(searchSouvenirNim.toLowerCase());

                        const areaMatch =
                          searchSouvenirArea === "" ||
                          item.area?.toLowerCase().includes(searchSouvenirArea.toLowerCase());

                        return periodeMatch && nimMatch && areaMatch;
                      })
                      .map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{item.nim}</td>
                        <td className="py-2 px-3 text-center">{item.nama}</td>
                        <td className="py-2 px-3 text-center">{item.jurusan}</td>
                        <td className="py-2 px-3 text-center">{item.role}</td>
                        <td className="py-2 px-3 text-center">{item.area}</td>
                        <td className="py-2 px-3 text-center">{item.fakultas}</td>
                        <td className="py-2 px-3 text-center">{item.periode}</td>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={item.souvenir}
                             onChange={(e) =>
                               handleSouvenirChange(item, e.target.checked)
                            }
                           />
                         </td>
                       </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </>
        )}
        
        {/* PAGE: EVALUASI DAN KUESIONER */}
        {activePage === "evaluasi-kuesioner" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Evaluasi & Kuesioner</h2>

            {/* Evaluasi */}
            <div className="bg-white p-5 rounded-xl shadow mb-6">
              <h3 className="text-lg font-semibold mb-3">Input Evaluasi</h3>

              <label className="font-semibold">Kategori</label>
              <select
                value={inputEval.role}
                onChange={(e) => setInputEval({ ...inputEval, role: e.target.value })}
                className="border p-2 w-full rounded mb-3"
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Peer Counselor">Peer Counselor</option>
                <option value="Peer Partner">Peer Partner</option>
                <option value="Creative Team">Creative Team</option>
              </select>

              <label className="font-semibold">Judul Evaluasi</label>
              <input
                name="title"
                value={inputEval.title}
                onChange={(e) => setInputEval({ ...inputEval, title: e.target.value })}
                className="border p-2 w-full rounded mb-3"
              />

              <label className="font-semibold">Link Evaluasi</label>
              <input
                name="link"
                value={inputEval.link}
                onChange={(e) => setInputEval({ ...inputEval, link: e.target.value })}
                className="border p-2 w-full rounded mb-3"
              />

              <button
                onClick={() => {
                  if (editIndexEval !== null) {

                    // Proses validasi wajib isi
                    if (!inputEval.role || !inputEval.title || !inputEval.link) {
                      Swal.fire({
                        icon: "warning",
                        title: "Kolom Belum Lengkap",
                        text: "Semua kolom pada form Evaluasi wajib diisi!",
                      });
                      return;
                    }

                    // proses konfirmasi
                    Swal.fire({
                      title: "Update Evaluasi?",
                      text: "Anda yakin ingin menyimpan perubahan ini?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonText: "Ya, Update",
                      cancelButtonText: "Batal",
                    }).then((result) => {
                      if (!result.isConfirmed) return;

                      const updated = { ...evalData };
                      updated.evaluations[editIndexEval] = inputEval;

                      setEvalData(updated);
                      localStorage.setItem("evaluationData", JSON.stringify(updated));

                      setEditIndexEval(null);
                      setInputEval({ title: "", link: "", role: "" });

                      Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: "Evaluasi berhasil diperbarui.",
                      });
                    });

                  } else {
                    saveEvaluasi();
                  }
                }}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
              >
                {editIndexEval !== null ? "Update Evaluasi" : "Simpan Evaluasi"}
              </button>

              {/* Daftar evaluasi yang tersimpan */}
                {evalData.evaluations.map((item, index) => (
                  <div key={index} className="mt-5 border p-4 rounded-lg bg-gray-50">

                    {/* Row kiri (judul & link) & kanan (tombol) */}
                    <div className="flex justify-between items-start">

                      {/* posisi kiri */}
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-500">Kategori: {item.role}</p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {item.link}
                        </a>
                      </div>

                      {/* posisi kanan tombol */}
                      <div className="flex gap-2">

                        {/* Tombol delete */}
                        <button
                          onClick={() => deleteEvaluasi(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Hapus
                        </button>

                        {/* Tombol edit */}
                        <button
                          onClick={() => {
                            setInputEval(item);
                            setEditIndexEval(index);
                          }}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Kuesioner */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-3">Input Kuesioner</h3>

              <label className="font-semibold">Kategori</label>
              <select
                value={inputKues.role}
                onChange={(e) => setInputKues({ ...inputKues, role: e.target.value })}
                className="border p-2 w-full rounded mb-3"
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Peer Counselor">Peer Counselor</option>
                <option value="Peer Partner">Peer Partner</option>
                <option value="Creative Team">Creative Team</option>
              </select>

              <label className="font-semibold">Judul Kuesioner</label>
              <input
                name="title"
                value={inputKues.title}
                onChange={(e) => setInputKues({ ...inputKues, title: e.target.value })}
                className="border p-2 w-full rounded mb-3"
              />

              <label className="font-semibold">Link Kuesioner</label>
              <input
                name="link"
                value={inputKues.link}
                onChange={(e) => setInputKues({ ...inputKues, link: e.target.value })}
                className="border p-2 w-full rounded mb-3"
              />

              <button
                onClick={() => {
                  if (editIndexKues !== null) {

                    // Proses validasi wajib isi
                    if (!inputKues.role || !inputKues.title || !inputKues.link) {
                      Swal.fire({
                        icon: "warning",
                        title: "Kolom Belum Lengkap",
                        text: "Semua kolom pada form Kuesioner wajib diisi!",
                      });
                      return;
                    }

                    // Proses konfirmasi
                    Swal.fire({
                      title: "Update Kuesioner?",
                      text: "Anda yakin ingin menyimpan perubahan ini?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonText: "Ya, Update",
                      cancelButtonText: "Batal",
                    }).then((result) => {
                      if (!result.isConfirmed) return;

                      const updated = { ...evalData };
                      updated.questionnaires[editIndexKues] = inputKues;

                      setEvalData(updated);
                      localStorage.setItem("evaluationData", JSON.stringify(updated));

                      setEditIndexKues(null);
                      setInputKues({ title: "", link: "", role: "" });

                      Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: "Kuesioner berhasil diperbarui.",
                      });
                    });

                  } else {
                    saveKuesioner();
                  }
                }}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
              >
                {editIndexKues !== null ? "Update Kuesioner" : "Simpan Kuesioner"}
              </button>

              {/* Daftar kuesioner yang tersimpan */}
              {evalData.questionnaires.map((item, index) => (
                <div key={index} className="mt-5 border p-4 rounded-lg bg-gray-50">

                  <div className="flex justify-between items-start">

                    {/* posisi kiri */}
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-500">Kategori: {item.role}</p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {item.link}
                      </a>
                    </div>

                    {/* posisi kanan pada tombol */}
                    <div className="flex gap-2">

                      {/* Tombol delete */}
                      <button
                        onClick={() => deleteKuesioner(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>

                      {/* Tombol edit */}
                      <button
                        onClick={() => {
                          setInputKues(item);
                          setEditIndexKues(index);
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
