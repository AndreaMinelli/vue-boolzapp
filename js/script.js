const dt = luxon.DateTime;

const app = Vue.createApp({
  data() {
    return {
      user: {
        name: "Andrea",
        avatar: "_io",
      },
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Ricordati di dargli da mangiare",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              text: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: false,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              text: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              text: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              text: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "received",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: false,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              text: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              text: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              text: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Luisa",
          avatar: "_4",
          visible: false,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
      ],
      newMessage: {
        date: "",
        text: "",
        status: "",
      },
      chatListFilter: "",
      optionsShowed: null,
    };
  },
  computed: {
    visibleContact() {
      return this.contacts.filter((contact) => contact.visible);
    },

    whoIsVisible() {
      return this.contacts.find((contact) => contact.visible);
    },

    filteredChatList() {
      const chatFilter = this.chatListFilter.toLowerCase();
      return this.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(chatFilter)
      );
    },
  },
  methods: {
    buildImgLink(element) {
      return `img/avatar${element.avatar}.jpg`;
    },
    isActive(element) {
      return element === this.whoIsVisible;
    },
    changeChat(i) {
      this.whoIsVisible.visible = false;
      this.filteredChatList[i].visible = true;
      this.optionsShowed = null;
    },
    sentMessage() {
      if (this.newMessage.text) {
        const thisMoment = (this.newMessage.date = dt
          .now()
          .toFormat("dd'/'LL'/'y' 'HH':'mm':'ss"));
        this.whoIsVisible.messages.push({
          ...(this.newMessage = {
            date: thisMoment,
            text: this.newMessage.text,
            status: "sent",
          }),
        });
        this.deleteText();
        this.receivedMessage();
      }
    },
    receivedMessage() {
      setTimeout(() => {
        const thisMoment = (this.newMessage.date = dt
          .now()
          .toFormat("dd'/'LL'/'y' 'HH':'mm':'ss"));
        this.whoIsVisible.messages.push({
          ...(this.newMessage = {
            date: thisMoment,
            text: "ok",
            status: "received",
          }),
        });
        this.deleteText();
      }, 1000);
    },
    deleteText(inputType) {
      if (inputType === "filter") {
        this.chatListFilter = "";
      } else {
        this.newMessage.text = "";
      }
    },
    showOptions(i) {
      if (this.optionsShowed === null || this.optionsShowed !== i) {
        this.optionsShowed = i;
      } else if (this.optionsShowed !== null) this.optionsShowed = null;
    },
    deleteMessage(i) {
      this.whoIsVisible.messages.splice(i, 1);
      this.optionsShowed = null;
    },
    lastChatinfo(element, type) {
      if (type === "text") {
        let text = element.messages[element.messages.length - 1].text;
        if (text.length > 10) {
          text = text.substring(0, 10);
          text += "...";
        }
        return text;
      } else return element.messages[element.messages.length - 1].date;
    },
  },
  updated() {
    const messageNumber = this.$refs.message.length - 1;
    const lastMessage = this.$refs.message[messageNumber];
    lastMessage.scrollIntoView();
  },
});

app.mount("#root");
