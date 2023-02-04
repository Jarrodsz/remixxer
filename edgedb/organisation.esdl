module default {

type Organisation {
  required property name -> str;
}

type OrganisationProfile {
  required property name -> str;
  required property address -> str;
  required property addressNr -> str;
  required property postal -> str;
  required property city -> str;
  #required property countryId -> int;
  # multi link countries := .<user[is Country];

  required link organisation -> Organisation {
    constraint exclusive;  # one-to-one
    on target delete delete source;
  }
}

type Memberships {
  property role -> int16;
  property invitedEmail -> str;
  property orgId -> int16;
  property code -> str;
  
  required link organisation -> Organisation {
    on target delete delete source;
  };
}

type OrganisationSubscription {
  property customerId -> str;
  property subscriptionId -> str;
  property planId -> str;
  property status -> str;
  property currentPeriodStart -> datetime { default := datetime_current() };
  property currentPeriodEnd -> datetime;
  property cancelAtPeriodEnd -> bool;
      
  required link organisation -> Organisation {
    constraint exclusive;  # one-to-one
    on target delete delete source;
  }
}

type Country {
  required property name -> str;
}

}