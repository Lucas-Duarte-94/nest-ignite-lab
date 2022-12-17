import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notifications";
import { GetRecipientNotification } from "./get-recipient-notifications";

describe('Get recipient notification', () => {
    it('should be able to return notifications by recipient id', async () => {
        const inMemoryNotificationsRepository = new InMemoryNotificationRepository();
        const getRecipientNotification = new GetRecipientNotification(inMemoryNotificationsRepository);

        await inMemoryNotificationsRepository.create(makeNotification());

        await inMemoryNotificationsRepository.create(makeNotification());

        await inMemoryNotificationsRepository.create(makeNotification({ recipientId: 'example-recipient-id2' }));

        const { notifications } = await getRecipientNotification.execute({
            recipientId: 'example-recipient-id'
        })

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({
                recipientId: 'example-recipient-id'
            }),
            expect.objectContaining({
                recipientId: 'example-recipient-id'
            })
        ]))
    });
}) 