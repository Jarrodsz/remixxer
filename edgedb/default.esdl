module default {

  type Note {
    required property title -> str;
    required property body -> str;
    required property createdAt -> datetime { default := datetime_current() };
    required link user -> User {
      on target delete delete source;
    };
  }

}
