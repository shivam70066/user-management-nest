import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
    @Get('')
    async hello(){
        return("hello")
    }
}
