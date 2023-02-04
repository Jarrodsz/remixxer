module default {

type Question {
    required property locale -> int32;
    required property title -> str;
    required property level -> int32;

    link branch := .<question[is Branch];
    multi link answers := .<question[is Answer];
}

type Answer {
    required property locale -> str;
    required property title -> str;
    required property score -> int32;

    required link question -> Question {
      constraint exclusive;  # one-to-one
      on target delete delete source;
    }
}

type UserAnswers {
    required property createdAt -> datetime { default := datetime_current() };
   
    required property score -> str;
    
    required link question -> Question {
      on target delete delete source;
    };
    
}

type Branch {
    required property title -> str;

    required link question -> Question {
      constraint exclusive;  # one-to-one
      on target delete delete source;
    }
}

}