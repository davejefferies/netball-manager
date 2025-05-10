import RoleRepository from '../repository/roleRepository'
import { controllerWrapper } from '../utils/controllerWrapper'

const roleRepository = new RoleRepository()

export const fetchRoleList = controllerWrapper(async () => {
    return await roleRepository.fetchAll()
})