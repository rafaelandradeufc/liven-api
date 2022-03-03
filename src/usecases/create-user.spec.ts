import { UserService } from "../services/UserSevice";

describe('Create user', () => {

    let userService: UserService;

    beforeAll(() => {
        userService = new UserService();
    });

    it('Criando novo usuario', async () => {
        
        const userData = {
            firstName: "Andre",
            lastName: "Martins",
            dateOfBirth: new Date(),
            cpf: "12345678900",
            email: "testusername",
            phone: "88912341234",
            username: "usertest",
            password: "123",
        };

        const user = await userService.create(userData);

        expect(user.username).toBe("usertest");

    });
});