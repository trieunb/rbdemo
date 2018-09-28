class Setting < ApplicationRecord
    before_create :setTimeCreate
    def setTimeCreate
        self.created_at = Time.now
        self.updated_at = nil
    end
end
