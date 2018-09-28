class RegisterCourse < ApplicationRecord
    mount_uploader :profile, ProfileUploader
    before_create :setTimeCreate
    def setTimeCreate
        self.created_at = Time.now
        self.updated_at = nil
    end
end
