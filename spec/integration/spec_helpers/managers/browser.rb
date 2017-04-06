require 'headless'

class Managers
  class Browser
    def initialize(extension_path)
      @extension_path = extension_path
      Headless.new(display: 104, reuse: true).start if test_env?
    end

    def browser
      @browser
    end

    def new_browser
      close_browser if @browser

      @browser = Watir::Browser.new :chrome, :switches => [
        '--no-sandbox',
        '--disable-impl-side-painting',
        '--ignore-certificate-errors',
        '--test-type',
        "--load-extension=#{@extension_path}"
      ]
    end

    def close_browser
      @browser.close
    end

    def test_env?
      !(/darwin/ =~ RUBY_PLATFORM)
    end
  end
end
