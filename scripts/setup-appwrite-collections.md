# Appwrite database setup

Use this guide to create the Appwrite database and collections manually in the Appwrite Console. The schema below mirrors `TODO.md` section 3 exactly so the runtime code in `src/lib/collections.ts` and `src/lib/appwrite-db.ts` matches the console configuration.

## 1. Create the database

1. Open your Appwrite project.
2. Go to **Databases**.
3. Click **Create database**.
4. Give it a name such as `nikahdigital`.
5. Copy the generated database ID into `.env.local` as:
   - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`

## 2. Create collections

Create these six collections inside the database and copy each generated collection ID into `.env.local`.

- `Users` → `NEXT_PUBLIC_COLLECTION_USERS`
- `Invitations` → `NEXT_PUBLIC_COLLECTION_INVITATIONS`
- `RSVPResponses` → `NEXT_PUBLIC_COLLECTION_RSVP_RESPONSES`
- `Templates` → `NEXT_PUBLIC_COLLECTION_TEMPLATES`
- `Payments` → `NEXT_PUBLIC_COLLECTION_PAYMENTS`
- `Analytics` → `NEXT_PUBLIC_COLLECTION_ANALYTICS`

When Appwrite asks for permissions, start with the permissions your app needs for the current phase. The RSVP submit route uses a server API key, so collection permissions can remain stricter while development continues.

## 3. Collection schemas

### Users

Purpose: extend Appwrite Auth with billing, tier, and product preferences.

| Attribute | Type | Required | Default |
| --- | --- | --- | --- |
| `authUserId` | string | yes | none |
| `email` | email | yes | none |
| `fullName` | string | yes | none |
| `tier` | enum(`free`,`premium`) | yes | `free` |
| `subscriptionStatus` | enum(`none`,`pending`,`active`,`past_due`,`cancelled`) | yes | `none` |
| `preferredLanguage` | enum(`id`,`en`) | yes | `id` |
| `whatsappNumber` | string | no | none |
| `defaultTemplateId` | relationship → `Templates.$id` | no | none |
| `createdAt` | datetime | yes | none |
| `updatedAt` | datetime | yes | none |

Indexes:
- `authUserId_unique` — unique on `authUserId`
- `email_idx` — on `email`
- `tier_subscription_idx` — on `tier`, `subscriptionStatus`

Relationships:
- `defaultTemplateId -> Templates.$id`
- one Appwrite Auth account maps to one `Users` document via `authUserId`

### Invitations

Purpose: store each user-created invitation and its custom wedding data.

| Attribute | Type | Required | Default |
| --- | --- | --- | --- |
| `userId` | relationship → `Users` | yes | none |
| `templateId` | relationship → `Templates` | yes | none |
| `slug` | string | yes | none |
| `title` | string | yes | none |
| `status` | enum(`draft`,`published`,`archived`) | yes | `draft` |
| `bride` | string | yes | none |
| `groom` | string | yes | none |
| `brideParents` | string | yes | none |
| `groomParents` | string | yes | none |
| `akadDate` | datetime | yes | none |
| `akadTime` | string | yes | none |
| `akadLocation` | string | yes | none |
| `resepsiDate` | datetime | yes | none |
| `resepsiTime` | string | yes | none |
| `resepsiLocation` | string | yes | none |
| `mapUrl` | url | no | none |
| `story` | string | no | none |
| `customPrimaryColor` | string | no | none |
| `customAccentColor` | string | no | none |
| `coverImageFileId` | string | no | none |
| `galleryFileIds` | string[] | no | none |
| `rsvpEnabled` | boolean | yes | `true` |
| `watermarkEnabled` | boolean | yes | `true` |
| `publishedAt` | datetime | no | none |
| `lastViewedAt` | datetime | no | none |
| `createdAt` | datetime | yes | none |
| `updatedAt` | datetime | yes | none |

Indexes:
- `slug_unique` — unique on `slug`
- `user_status_idx` — on `userId`, `status`
- `template_idx` — on `templateId`
- `publishedAt_idx` — on `publishedAt`

Relationships:
- `userId -> Users.$id`
- `templateId -> Templates.$id`
- one invitation has many `RSVPResponses`, `Payments`, and `Analytics` rows

### RSVPResponses

Purpose: persist guest submissions from the public invitation page.

| Attribute | Type | Required | Default |
| --- | --- | --- | --- |
| `invitationId` | relationship → `Invitations` | yes | none |
| `guestName` | string | yes | none |
| `attendance` | enum(`hadir`,`tidak_hadir`) | yes | none |
| `guestCount` | integer | yes | `1` |
| `message` | string | no | none |
| `guestPhone` | string | no | none |
| `guestTag` | string | no | none |
| `submittedAt` | datetime | yes | none |
| `createdAt` | datetime | yes | none |

Indexes:
- `invitation_submittedAt_idx` — on `invitationId`, `submittedAt`
- `invitation_attendance_idx` — on `invitationId`, `attendance`
- `guestName_idx` — on `guestName`

Relationships:
- `invitationId -> Invitations.$id`

### Templates

Purpose: move template metadata out of hard-coded arrays and make it manageable by admin.

| Attribute | Type | Required | Default |
| --- | --- | --- | --- |
| `templateKey` | string | yes | none |
| `name` | string | yes | none |
| `description` | string | yes | none |
| `region` | string | yes | none |
| `category` | string | yes | none |
| `previewColor` | string | yes | none |
| `accentColor` | string | yes | none |
| `bgPattern` | string | yes | none |
| `componentName` | string | yes | none |
| `tierAccess` | enum(`free`,`premium`) | yes | `premium` |
| `status` | enum(`active`,`draft`,`archived`) | yes | `draft` |
| `sortOrder` | integer | yes | `100` |
| `thumbnailFileId` | string | no | none |
| `isFeatured` | boolean | yes | `false` |
| `createdByUserId` | relationship → `Users` | no | none |
| `createdAt` | datetime | yes | none |
| `updatedAt` | datetime | yes | none |

Indexes:
- `templateKey_unique` — unique on `templateKey`
- `status_sort_idx` — on `status`, `sortOrder`
- `category_region_idx` — on `category`, `region`
- `tierAccess_idx` — on `tierAccess`

Relationships:
- `createdByUserId -> Users.$id`
- one template can be referenced by many `Invitations`

### Payments

Purpose: record Stripe checkout activity and premium purchases.

| Attribute | Type | Required | Default |
| --- | --- | --- | --- |
| `userId` | relationship → `Users` | yes | none |
| `invitationId` | relationship → `Invitations` | no | none |
| `stripeCheckoutSessionId` | string | yes | none |
| `stripePaymentIntentId` | string | no | none |
| `stripeCustomerId` | string | no | none |
| `amount` | integer | yes | none |
| `currency` | enum(`idr`) | yes | `idr` |
| `plan` | enum(`premium_invitation`) | yes | none |
| `status` | enum(`pending`,`paid`,`failed`,`refunded`,`expired`) | yes | `pending` |
| `paidAt` | datetime | no | none |
| `createdAt` | datetime | yes | none |
| `updatedAt` | datetime | yes | none |

Indexes:
- `checkout_unique` — unique on `stripeCheckoutSessionId`
- `user_status_idx` — on `userId`, `status`
- `invitation_idx` — on `invitationId`
- `paidAt_idx` — on `paidAt`

Relationships:
- `userId -> Users.$id`
- `invitationId -> Invitations.$id`

### Analytics

Purpose: simple daily aggregate for page views and RSVP counts per invitation.

| Attribute | Type | Required | Default |
| --- | --- | --- | --- |
| `invitationId` | relationship → `Invitations` | yes | none |
| `dateKey` | string | yes | none |
| `pageViews` | integer | yes | `0` |
| `uniqueVisitors` | integer | yes | `0` |
| `rsvpCount` | integer | yes | `0` |
| `lastViewedAt` | datetime | no | none |
| `lastRsvpAt` | datetime | no | none |
| `createdAt` | datetime | yes | none |
| `updatedAt` | datetime | yes | none |

Indexes:
- `invitation_date_unique` — unique on `invitationId`, `dateKey`
- `date_idx` — on `dateKey`
- `views_idx` — on `pageViews`

Relationships:
- `invitationId -> Invitations.$id`

## 4. Environment variables to copy into `.env.local`

After the database and collections exist, fill in these variables:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_API_KEY=your_api_key_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_COLLECTION_USERS=your_users_collection_id
NEXT_PUBLIC_COLLECTION_INVITATIONS=your_invitations_collection_id
NEXT_PUBLIC_COLLECTION_RSVP_RESPONSES=your_rsvp_responses_collection_id
NEXT_PUBLIC_COLLECTION_TEMPLATES=your_templates_collection_id
NEXT_PUBLIC_COLLECTION_PAYMENTS=your_payments_collection_id
NEXT_PUBLIC_COLLECTION_ANALYTICS=your_analytics_collection_id
```

Recommended API key scopes:
- `accounts.read`
- `accounts.write`
- `sessions.write`
- `sessions.delete`
- `users.read`
- `users.write`
- `databases.read`
- `databases.write`
- `collections.read`
- `collections.write`
