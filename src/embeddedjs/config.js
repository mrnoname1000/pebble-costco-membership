module.exports = [
  {
    type: "heading",
    defaultValue: "Watchface Settings",
  },
  {
    type: "text",
    defaultValue: "Customize your watchface appearance and preferences.",
  },
  {
    type: "section",
    items: [
      {
        type: "heading",
        defaultValue: "Secrets",
      },
      {
        type: "text",
        messageKey: "MembershipId",
        label: "Membership ID",
        defaultValue: false,
      },
      {
        type: "text",
        messageKey: "AndroidId",
        label: "ANDROID_ID",
        defaultValue: false,
      },
    ]
  },
  {
    type: "section",
    items: [
      {
        type: "heading",
        defaultValue: "Preferences",
      },
      {
        type: "toggle",
        messageKey: "TemperatureUnit",
        label: "Use Fahrenheit",
        defaultValue: false,
      },
      {
        type: "toggle",
        messageKey: "ShowDate",
        label: "Show Date",
        defaultValue: true,
      }
    ]
  },
  {
    type: "submit",
    defaultValue: "Save Settings",
  }
];