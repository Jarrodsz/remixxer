module default {

type User {
    required property createdAt -> datetime { default := datetime_current() };
    required property email -> str { constraint exclusive };
    property onboarded -> bool;
    link password := .<user[is Password];
    link userProfile := .<user[is UserProfile];
    #link organisation := .<user[is Organisation];
  
    multi link memberships := .<user[is Memberships];
    multi link userAnswers := .<user[is UserAnswers];
    multi link notes := .<user[is Note];
}

type Password {
    required property hash -> str;
    
    required link user -> User {
      constraint exclusive;  # one-to-one
      on target delete delete source;
    }
}

type UserProfile {
    property firstName -> str;
    property lastName -> str;
    property name :=
        .firstName ++ ' ' ++ .lastName
		IF EXISTS .lastName
		ELSE .firstName;	
    
    required link user -> User {
      constraint exclusive;  # one-to-one
      on target delete delete source;
    }
}

}