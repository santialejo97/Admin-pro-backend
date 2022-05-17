const getMenuFrontend = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Dashborad",
      icon: "mdi mdi-gauge",
      submenu: [
        { titulo: "Main", url: "dash" },
        { titulo: "Progress", url: "progress" },
        { titulo: "Graphis", url: "graficas" },
        { titulo: "Promesas", url: "promesas" },
        { titulo: "Rxjs", url: "rxjs" },
      ],
    },
    {
      title: "Mantenimientos",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        // { titulo: "Usuarios", url: "usuarios" },
        { titulo: "Hospitales", url: "hospitales" },
        { titulo: "Médicos", url: "medicos" },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ titulo: "Usuarios", url: "usuarios" });
  }
  return menu;
};

module.exports = {
  getMenuFrontend,
};
