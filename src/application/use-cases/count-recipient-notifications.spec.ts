import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notifications";

describe('Count recipient notification', () => {
    it('should be able to count notification by recipient id', async () => {
        const inMemoryNotificationsRepository = new InMemoryNotificationRepository();
        const countRecipientNotification = new CountRecipientNotification(inMemoryNotificationsRepository);

        await inMemoryNotificationsRepository.create(makeNotification());

        await inMemoryNotificationsRepository.create(makeNotification());

        await inMemoryNotificationsRepository.create(makeNotification({ recipientId: 'example-recipient-id2' }));

        const { count } = await countRecipientNotification.execute({
            recipientId: 'example-recipient-id'
        })

        expect(count).toEqual(2);
    });
}) 