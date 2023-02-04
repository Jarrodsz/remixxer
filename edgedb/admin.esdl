module default {

type Admin {
    required property createdAt -> datetime { default := datetime_current() };
    required property email -> str { constraint exclusive };
    link Password := .<admin[is AdminPassword];
    link Profile := .<admin[is AdminProfile];
    link AdminProfile := .<admin[is AdminProfile];
}

type AdminPassword {
    required property hash -> str;
    required link admin -> Admin {
      constraint exclusive;  # one-to-one
      on target delete delete source;
    }
}

type AdminProfile {
    property firstName -> str;
    property lastName -> str;
    property name :=
        .firstName ++ ' ' ++ .lastName
		IF EXISTS .lastName
		ELSE .firstName;	
    required link admin -> Admin {
      constraint exclusive;  # one-to-one
      on target delete delete source;
    }
}
}